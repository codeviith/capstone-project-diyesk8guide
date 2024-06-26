### Remote library imports
from flask import Flask, jsonify, make_response, request, session, redirect, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
from sqlalchemy import desc, func
from datetime import timedelta, datetime, timezone
from werkzeug.utils import secure_filename
from PIL import Image
from io import BytesIO
from threading import Thread, Event
import time
import boto3
import logging
import traceback
from dateutil.parser import isoparse
from functools import wraps
import os


### Local imports
from models import Board, Guru, User, ContactUs, Gallery, Heart, Report
from config import db, bcrypt

### API imports
from openai import OpenAI

### Load environment variables
load_dotenv()

### Instantiate app
app = Flask(__name__)

### Set app attributes
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'   ### uncomment to test code on development server
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')   ### uncomment for production build on render
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')
app.config['BASE_URL'] = os.environ.get('BASE_URL', 'http://127.0.0.1:5555')  
###### IMPORTANT!!! make sure to configure the 'BASE_URL' environment variable on Render as either Render backend URL or my custom domain: www.diyesk8guide.com #####

app.json.compact = False

# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.office365.com'  ### HAVE to use the SMTP server from Office365 and NOT from GoDaddy! Makes sense because it is Office365 Outlook that is sending out the email.
app.config['MAIL_PORT'] = 587   ### TLS authentication: 587, SSL authentication: 465, no TLS or SSL authentication: 80
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.environ.get('FLASK_MAIL_NAME_ADMIN')
app.config['MAIL_PASSWORD'] = os.environ.get('FLASK_MAIL_KEY')

# Initialize Flask-Mail
mail = Mail(app)


### Instantiate db
db.init_app(app)
# db = SQLAlchemy(app)
migrate = Migrate(app, db)

### API Secret Keys
openai_api_key = os.environ.get('OPENAI_API_KEY')  ### or os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai_api_key)

### Instantiate CORS
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "https://diyesk8guide.com"}})
# CORS(app, resources={
#     r"/*": {
#         "origins": ["https://diyesk8guide-frontend.onrender.com"],
#         "methods": ["GET"],  ### code for allowed methods
#         "allow_headers": ["*"],  ### code for allowed headers
#         "expose_headers": [],  ### code for headers that browsers are allowed access to
#         "supports_credentials": True,
#         "max_age": 3000,  ### code for maximum cache age for preflight requests
#     }
# })

### configure session
# app.config['SESSION_TYPE'] = 'sqlalchemy'
# app.config['SESSION_SQLALCHEMY'] = db
app.config['SESSION_PERMANENT'] = True

### Configure session cookies
app.config['SESSION_COOKIE_SECURE'] = True  ### cookies will be sent only over HTTPS --> good for production
# app.config['SESSION_COOKIE_SECURE'] = False  ### cookies will NOT be over HTTPS --> good for development
app.config['REMEMBER_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True  ### Security against hacker access via .js
app.config['SESSION_COOKIE_SAMESITE'] = 'None' ### Can also use 'Lax' but None is more secure
# app.config['SESSION_COOKIE_PATH'] = '/'
# app.config['SESSION_COOKIE_DOMAIN'] = 'https://diyesk8guide-frontend.onrender.com'  ### seems to introduce a bunch of errors...
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=20) 
# app.config['SESSION_REFRESH_EACH_REQUEST'] = True

### Initialize Bcrypt
bcrypt.init_app(app)


### configure logging
if not app.debug:
    app.logger.setLevel(logging.INFO)



# mail_logger = logging.getLogger('flask_mail')
# mail_logger.setLevel(logging.DEBUG)
# mail_logger.addHandler(logging.StreamHandler())



### ------------ THROTTLE ACCESS/REQUEST RATES -------------- ###


request_counts = {}
REQUEST_LIMIT = 100
WINDOW_SIZE = timedelta(minutes=10)

def rate_limit(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        ip_address = request.remote_addr
        current_time = datetime.now()

        for ip, (timestamp, count) in list(request_counts.items()):  ### code to cleanup old entries
            if current_time - timestamp > WINDOW_SIZE:
                del request_counts[ip]
        
        if ip_address in request_counts:  ### code to check rate limit for the current IP
            timestamp, count = request_counts[ip_address]
            if current_time - timestamp <= WINDOW_SIZE and count >= REQUEST_LIMIT:
                return jsonify({"error": "Too many requests"}), 429
            elif current_time - timestamp <= WINDOW_SIZE:
                request_counts[ip_address] = (timestamp, count + 1)
            else:
                request_counts[ip_address] = (current_time, 1)
        else:
            request_counts[ip_address] = (current_time, 1)
        return func(*args, **kwargs)
    return wrapper

@app.before_request
def before_request_func():
    excluded_routes = ['login', 'signup', 'static', 'bump']  ### code to exclude specific endpoints from the rate limiter
    if request.endpoint not in excluded_routes:
        return rate_limit(lambda: None)()


### ------------------ SESSION ACTIVITY CHECK ------------------ ###

@app.before_request
def before_request_func():
    excluded_routes = ['login', 'signup', 'static', 'bump', 'keep_session_alive']  ### code to exclude the endpoints from activity check
    if request.endpoint not in excluded_routes:
        if 'last_activity' in session:
            last_activity = isoparse(session['last_activity'])
            if datetime.now(timezone.utc) - last_activity > timedelta(minutes=16):
                session.clear()
                return jsonify({'error': 'Session timed out. Please log in again.'}), 401
            else:
                session['last_activity'] = datetime.now(timezone.utc).isoformat()

### ------------------ KEEP SERVER AWAKE ------------------ ###

@app.route('/bump')
def bump():
    return jsonify({"message": "blank"}), 200

### ------------------ AWS S3 CLIENT ------------------ ###

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
    region_name=os.environ.get('AWS_REGION')
)

S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')

### ------------------ UNIVERSAL HELPER FUNCTION(S) ------------------ ###

def is_authenticated():
    return 'user_id' in session

### ------------------ OPENAI API CALL WITH TIMEOUT ------------------ ###

guru_instructions = "You are an expert in electric skateboards (aka. esk8, eboard(s), e-board(s)), specifically focusing on the technical components such as batteries, motors, pulleys, belts, and controllers. Provide in-depth technical advice on topics like battery management systems (BMS), DC/brushless motors, wheel (urethane or pneumatic) specifications, motor and wheel pulleys, timing belts, electronic speed controllers (ESC), LED setups, and radio-controlled (RC) receivers and controllers. Use technical language appropriate for an audience familiar with electrical engineering and mechanical design. Explain concepts in detail but ensure the explanations are concise and focused on practical application. If a question is outside this scope, politely redirect to topics within the expertise area."

openai_timeout_value = 120

@app.post('/guru_assistant')
def guru_assistant():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401

    data = request.get_json()
    user_input = data.get('user_input')

    if not user_input:
        return jsonify({"error": "User input cannot be empty"}), 400
    
    completion_event = Event()
    results = {}

    def openai_call_with_timeout():
        try:
            messages = [
                {"role": "system", "content": guru_instructions},
                {"role": "user", "content": f'I have a question about: {user_input}.'}
            ]
            completion = client.chat.completions.create(
                model="gpt-4-0125-preview",
                messages=messages,
                max_tokens=1500,
                temperature=0.35,
                top_p=0.75
            )
            if not completion_event.is_set():
                results['response'] = completion.choices[0].message.content
                completion_event.set()
        except Exception as e:
            # app.logger.error(f"OpenAI call failed: {traceback.format_exc()}")
            results['error'] = str(e)
            completion_event.set()

    api_thread = Thread(target=openai_call_with_timeout)
    api_thread.start()

    completion_event.wait(timeout=openai_timeout_value)

    if 'response' in results:
        try:
            guru_entry = Guru(user_input=user_input, answer=results["response"], user_id=session['user_id'])
            db.session.add(guru_entry)
            db.session.commit()
            return jsonify({"content": results["response"]}), 200
        except Exception as e:
            # app.logger.error(f"Database operation failed: {traceback.format_exc()}")
            return jsonify({"error": "Failed to save the response."}), 500
    elif 'error' in results:
        return jsonify({"error": results["error"]}), 500
    else:
        return jsonify({"error": "Response timed out."}), 408
    
### ------------------ ROOT/HOME ------------------ ###

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the API'}), 200

### ------------------ AUTHENTICATION ------------------ ###

def is_logged_in():
    return 'user_id' in session

##### DEBUG #####
# @app.route('/debug/session', methods=['GET'])
# def debug_session():
#     if 'user_id' in session:
#         return jsonify({'user_id': session['user_id']}), 200
#     else:
#         return jsonify({'message': 'No active session'}), 401

# @app.route('/debug/headers', methods=['GET'])
# def debug_headers():
#     headers = request.headers
#     print(headers)
#     return jsonify({'headers': dict(headers)}), 200

### ------------------ COOKIE ------------------ ###

@app.route('/check_session', methods=['GET'])
def check_session():
    if 'user_id' in session:
        return jsonify({'logged_in': True}), 200
    else:
        return jsonify({'logged_in': False}), 200

### ------------ KEEP SESSION ALIVE ------------ ###

@app.route('/keep_session_alive', methods=['POST'])
def keep_session_alive():
    if 'user_id' in session:
        session['last_activity'] = datetime.now(timezone.utc).isoformat()  ### code to update session's time of last activity to keep it alive
        return jsonify({'message': 'Session refreshed successfully.'}), 200
    else:
        return jsonify({'error': 'Session expired or invalid.'}), 401  ### code to consider session as expired

### ------------------ LOG IN ------------------ ###

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and bcrypt.check_password_hash(user.password_hash, data['password']):
            session['user_id'] = user.id
            session['last_activity'] = datetime.now(timezone.utc).isoformat()
            # app.logger.info('User logged in: %s', user.id)  ### code to log successul login
            return jsonify({'success': True, 'message': 'Logged in successfully'}), 200
        else:
            return jsonify({'success': False, 'message': 'Invalid email or password'}), 401
    except Exception as e:
        app.logger.error(f"Login error: {e}")  ## code to log unsuccessful login
        return jsonify({'error': 'Internal Server Error', 'message': str(e)}), 500

### ------------------ LOG OUT ------------------ ###

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

### ------------------ SIGN UP ------------------ ###

def send_welcome_email(email, fname):
    msg = Message("Welcome to DIYeSk8Guide!",
                sender=os.environ.get('FLASK_MAIL_NAME_ADMIN'),
                recipients=[email])
    msg.body = f"""
        Hi {fname},

        Welcome to DIYeSk8Guide, your ultimate resource for building and customizing electric skateboards. We are excited to have you join our community. Whether you're crafting your first board or looking to refine your skills, here's what you can find on our platform:

        - Guides: Immerse yourself in our in-depth Quick Start Guide and specialized tutorials. Each step is crafted to provide you with comprehensive insights, ensuring you have the know-how to assemble your dream board.
        - Generate: Utilize our Generate feature to automatically craft a custom skateboard build, tailored to your preferences. Save time and ensure you get the best possible results with our intelligent recommendations.
        - Guru: Have questions? Our Esk8 Guru is here to provide instant, reliable advice on everything from component choice to troubleshooting.
        - Gallery: Join our vibrant community in the Gallery where you can share your completed projects, gain inspiration, and maybe even be featured in our Hall of Fame!
        - (Coming Soon!) Video Tutorials: Watch our expert builders put together different types of boards and explain the intricacies of each part.
        - (Coming Soon!) Community Insights: Join discussions with other enthusiasts to share tips, tricks, and board mods.

        Ready to start? Visit DIYesk8Guide today and explore all that it has to offer. We're thrilled to have you on board — let's gear up and skate through the DIY journey together!

        Happy building!


        Warm regards,
        The DIYeSk8Guide Team
        
        P.S. If you find the content and resources on DIYesk8Guide helpful, please consider supporting us with a donation at https://pay.diyesk8guide.com. Your support helps us enhance the platform and continue to deliver valuable content. Thank you for being a vital part of our community!
        """
    msg.html =  f"""
        <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; }}
                    h1 {{ color: #333; }}
                    ul {{ list-style-type: none; }}
                    li {{ margin-bottom: 10px; }}
                    a {{ color: #1a0dab; }}
                </style>
            </head>
            <body>
                <p>Hi {fname},</p>
                <br>
                <p>Welcome to <strong>DIYeSk8Guide</strong>, your ultimate resource for building and customizing electric skateboards.</p>
                <p>We are excited to have you join our community. Whether you're crafting your first board or looking to refine your skills, here's what you can find on our platform:</p>
                <ul>
                    <li><strong>Guides:</strong> Immerse yourself in our in-depth Quick Start Guide and specialized tutorials. Each step is crafted to provide you with comprehensive insights, ensuring you have the know-how to assemble your dream board.</li>
                    <li><strong>Generate:</strong> Utilize our Generate feature to automatically craft a custom skateboard build, tailored to your preferences. Save time and ensure you get the best possible results with our intelligent recommendations.</li>
                    <li><strong>Guru:</strong> Have questions? Our Esk8 Guru is here to provide instant, reliable advice on everything from component choice to troubleshooting.</li>
                    <li><strong>Gallery:</strong> Join our vibrant community in the Gallery where you can share your completed projects, gain inspiration, and maybe even be featured in our Hall of Fame!</li>
                    <li><strong>(Coming Soon!) Video Tutorials:</strong> Watch our expert builders put together different types of boards and explain the intricacies of each part.</li>
                    <li><strong>(Coming Soon!) Community Insights:</strong> Join discussions with other enthusiasts to share tips, tricks, and board mods.</li>
                </ul>
                <p>Ready to start? Visit <a href='https://www.diyesk8guide.com'>DIYesk8Guide</a> today and explore all that it has to offer.</p>
                <p>We're thrilled to have you on board — let's gear up and skate through the DIY journey together!🛹</p>
                <p>Happy building!</p>
                <br>
                <br>
                <p>Warm regards,</p>
                <p><strong>The DIYeSk8Guide Team</strong></p>
                <br>
                <p>P.S. If you find the content and resources on DIYesk8Guide helpful, please consider supporting us with a <a href='https://pay.diyesk8guide.com'>donation</a>. Your support helps us enhance the platform and continue to deliver valuable content. Thank you for being a vital part of our community!</p>
            </body>
        </html>
        """
    try:
        mail.send(msg)
        return jsonify({'message': 'Welcome email sent successfully'}), 201
    except Exception as e:
        app.logger.error("An error occurred while sending email: %s", str(e))
        print("Error details:", str(e))
        return jsonify({'error': 'Failed to send email', 'message':str(e)}), 500

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        fname = data['firstName']
        lname = data['lastName']
        rider_stance = data['riderStance']
        boards_owned = ','.join(data['boardsOwned'])

        ### Check if user already exists
        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'Email already in use'}), 409

        ### Create new user
        new_user = User(email=email, fname=fname, lname=lname, rider_stance=rider_stance, boards_owned=boards_owned)
        new_user.password_hash = password  ### Sets the password hash

        db.session.add(new_user)
        db.session.commit()

        send_welcome_email(email, fname)  # Send welcome email after committing the user data
        return jsonify({'message': 'Account created successfully'}), 201

    except Exception as e:
        db.session.rollback()
        app.logger.error("Signup failed: %s", str(e))
        return jsonify({'error': 'Failed to create account', 'message': str(e)}), 500

### ------------------ CONTACTUS ------------------ ###

@app.route('/contact_us', methods=['POST'])
def contact_form():
    try:
        # app.logger.debug(f"Session before contact form submission: {session}")
        if 'user_id' not in session:
            # app.logger.debug(f"Session not found: {session}")
            return jsonify({'error': 'Authentication required.'}), 401
    
        user_id = session['user_id']
        data = request.json

        new_contact = ContactUs(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            message=data['message'],
            user_id=user_id
        )

        db.session.add(new_contact)
        db.session.commit()

        # Send form information to support email
        send_contact_email(data)

        return jsonify({'message': 'Your message has been successfully submitted'}), 200

    except Exception as e:
        # app.logger.error(f"Error processing contact form: {str(e)}")
        print(str(e))
        return jsonify({'error': 'An error occurred while processing your request'}), 500
    
def send_contact_email(data):
    try:
        msg = Message(
            "New Contact Us Message",
            sender=os.environ.get('FLASK_MAIL_NAME_ADMIN'),
            recipients=os.environ.get('FLASK_MAIL_NAME_SUPPORT'),
        )
        msg.body = f"""
        You have received a new message from {data['firstName']}.

        Message: {data['message']}

        Sender Contact:
        First Name: {data['firstName']}
        Last Name: {data['lastName']}
        Email: {data['email']}
        """
        mail.send(msg)
    except Exception as e:
        app.logger.error("An error has occurred while sending message to email: %s", str(e))
        print("Error details:", str(e))

### ------------------ USER ------------------ ###

@app.route('/user_data', methods=['GET'])
def get_user_data():
    try:
        if 'user_id' not in session:
            # app.logger.info('Session check failed: user_id not in session')
            return jsonify({'error': 'Authentication required.'}), 401

        user = User.query.get(session['user_id'])
        if user:
            return jsonify(user.to_dict()), 200
        else:
            return jsonify({'error': 'User not found.'}), 404
    except Exception as e:
        app.logger.error(f"Error fetching user data: {e}", exc_info=True)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/user_data/<int:user_id>', methods=['PATCH'])
def update_user_data(user_id):
    if 'user_id' not in session or session['user_id'] != user_id:
        return jsonify({'error': 'Authentication required or invalid user.'}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    data = request.get_json()

    if 'fname' in data:
        user.fname = data['fname']
    if 'lname' in data:
        user.lname = data['lname']
    if 'email' in data:
        user.email = data['email']
    if 'rider_stance' in data:
        user.rider_stance = data['rider_stance']
    if 'boards_owned' in data:
        user.boards_owned = ','.join(data['boards_owned'])
    if 'password' in data:
        user.password_hash = bcrypt.generate_password_has(data['password']).decode('utf-8')

    db.session.commit()

    return jsonify({'message': 'User data updated successfully'}), 200

@app.route('/check-password', methods=['POST'])
def check_current_password():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401

    user_id = session['user_id']
    data = request.get_json()
    current_password = data.get('currentPassword')

    user = User.query.get(user_id)
    if user and bcrypt.check_password_hash(user.password_hash, current_password):
        return jsonify({'matches': True})
    else:
        return jsonify({'matches': False})

@app.route('/change_password', methods=['POST'])
def change_password():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401

    user_id = session['user_id']
    data = request.get_json()
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')

    user = User.query.get(user_id)

    if not user or not bcrypt.check_password_hash(user.password_hash, current_password):
        return jsonify({'error': 'Current password is incorrect'}), 400

    user.password_hash = new_password  ### Code to trigger setter in the User model
    db.session.commit()

    return jsonify({'message': 'Password changed successfully'}), 200

### --------------------- DELETE USER ACCOUNT --------------------- ###

@app.route('/delete_account', methods=['POST'])
def delete_account():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401

    user_id = session['user_id']
    data = request.get_json()
    confirmation = data.get('confirmation')

    if confirmation != "I confirm":
        return jsonify({'error': 'Confirmation does not match, account not deleted.'}), 400

    try:  ### code to manually delete all data, i.e. boards, questions, and images,etc, associated with this user
        hearts = Heart.query.filter_by(user_id=user_id).all()
        for heart in hearts:
            gallery_item = Gallery.query.get(heart.gallery_id)
            if gallery_item:
                gallery_item.hearts = Gallery.hearts - 1  ### code to manually decrease heart count
                db.session.add(gallery_item)  ### adds the changes to be ready for db.commit

        reports = Report.query.filter_by(user_id=user_id).all()
        for report in reports:
            gallery_item = Gallery.query.get(report.gallery_id)
            if gallery_item and hasattr(gallery_item, 'report_count'):  ### code to check if gallery_item has 'report_count' attribute
                gallery_item.report_count -= 1   ### code to manually decrease report count
                db.session.add(gallery_item)   ### again, adds the changes to be ready for db.commit

        Heart.query.filter_by(user_id=user_id).delete()
        Report.query.filter(Report.user_id == user_id).delete()
        Board.query.filter_by(user_id=user_id).delete()
        Guru.query.filter_by(user_id=user_id).delete()

        gallery_images = Gallery.query.filter_by(user_id=user_id).all()

        for image in gallery_images:  ### code to find and delete the image associated with the user in S3
            try:
                s3_client.delete_object(Bucket=S3_BUCKET_NAME, Key=image.image_filename)
            except Exception as e:
                app.logger.error(f'Failed to delete image {image.image_filename} from S3: {e}')
            
            db.session.delete(image)

        user = User.query.get(user_id)  ### user account is deleted LAST because need to have everything else deleted first.
        db.session.delete(user)
        db.session.commit()   ### code to commit all the deletions above

        session.pop('user_id', None)  ### code to log the user out

        return jsonify({'message': 'Account and all associated data deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        app.logger.error(f'Error during account deletion: {e}')

        return jsonify({'error': 'An error occurred during account deletion.'}), 500

### ------------------ BOARDS ------------------ ###

@app.route('/boards', methods=['GET'])
def get_boards():
    try:
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required.'}), 401
        
        user_id = session['user_id']
        boards = Board.query.filter_by(user_id=user_id).all()
        return make_response(jsonify([board.to_dict() for board in boards]), 200)
    except Exception as e:
        app.logger.error(f"Error fetching boards: {e}", exc_info=True)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/latest_boards')
def get_latest_board():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required.'}), 401
    
    user_id = session['user_id']
    latest_board = Board.query.filter_by(user_id=user_id).order_by(desc(Board.timestamp)).first()

    if latest_board:
        return jsonify(latest_board.to_dict()), 200
    else:
        return jsonify({'error': 'No board data available.'}), 404

@app.route('/boards/<int:board_id>', methods=['DELETE'])
def delete_board_by_id(board_id):
    board = Board.query.filter(Board.id == board_id).first()

    if board:
        db.session.delete(board)
        db.session.commit()
        return {"message": "Board deleted successfully."}, 200
    else:
        return {"error": "Board not found."}, 404

@app.post('/update_board')
def update_board():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    user_id = session['user_id']
    data = request.json

    deck_type = data.get('deckType', '')
    deck_length = data.get('deckLength', '')
    deck_material = data.get('deckMaterial', '')
    truck_type = data.get('truckType', '')
    truck_width = data.get('truckWidth', '')
    controller_feature = data.get('controllerFeature', '')
    controller_type = data.get('controllerType', '')
    remote_feature = data.get('remoteFeature', '')
    remote_type = data.get('remoteType', '')
    motor_size = data.get('motorSize', '')
    motor_kv = data.get('motorKv', '')
    # speed = data.get('speed', '')   ### not for current release, possibly later for a new feature?
    wheel_size = data.get('wheelSize', '')
    wheel_type = data.get('wheelType', '')
    battery_voltage = data.get('batteryVoltage', '')
    battery_type = data.get('batteryType', '')
    battery_capacity = data.get('batteryCapacity', '')
    battery_configuration = data.get('batteryConfiguration', '')
    range_mileage = data.get('mileage', '')
    image_url = data.get('imageURL', '')

    board_entry = Board(user_id=user_id, 
                        deck_type=deck_type, 
                        deck_length=deck_length, 
                        deck_material=deck_material, 
                        truck_type=truck_type, 
                        truck_width=truck_width, 
                        controller_feature=controller_feature, 
                        controller_type=controller_type, 
                        remote_feature=remote_feature, 
                        remote_type=remote_type, 
                        motor_size=motor_size, 
                        motor_kv=motor_kv, 
                        # speed=speed,
                        wheel_size=wheel_size, 
                        wheel_type=wheel_type, 
                        battery_voltage=battery_voltage, 
                        battery_type=battery_type, 
                        battery_capacity=battery_capacity, 
                        battery_configuration=battery_configuration, 
                        range_mileage=range_mileage, 
                        image_url=image_url)
    db.session.add(board_entry)
    db.session.commit()

    return {"message": "Board data saved successfully."}, 200

### ------------------ GURU ------------------ ###

@app.route('/guru', methods=['GET'])
def get_guru_data():
    try:
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required.'}), 401
        
        user_id = session['user_id']
        guru_data = Guru.query.filter_by(user_id=user_id).all()
        
        return make_response(jsonify([guru_datum.to_dict() for guru_datum in guru_data]), 200)
    except Exception as e:
        app.logger.error(f"Error fetching guru data: {e}", exc_info=True)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/guru/<int:question_id>', methods=['DELETE'])
def delete_guru_question(question_id):
    try:
        question = Guru.query.get(question_id)
        if not question:
            return jsonify({"error": "Question not found"}), 404

        db.session.delete(question)
        db.session.commit()
        return jsonify({"message": "Question deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

### ------------------ GALLERY ------------------ ###

@app.route('/images/<filename>')
def serve_image(filename):
    try:
        image_url = f'https://{S3_BUCKET_NAME}.s3.amazonaws.com/{filename}'
        # print (image_url)
        return redirect(image_url)
    except Exception as e:
        app.logger.error(f"Error serving image: {filename}, Error: {e}")
        return jsonify({'error': 'Image not found'}), 404

@app.route('/gallery/upload', methods=['POST'])
def upload_image():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required.'}), 401

    user_id = session['user_id']
    image = request.files.get('image')

    if not image:
        return jsonify({'error': 'No image provided'}), 400

    filename = secure_filename(image.filename)  ### this code isn't necessary since we're using S3 but still good practice
    
    try:
        ### Code to resize image
        with Image.open(image.stream) as img:
            original_width, original_height = img.size

            if original_width > original_height: ### Code to check for target dimen while maintaining aspect ratio
                ### Landscape
                target_width = 1600
                aspect_ratio = original_height / original_width
                target_height = int(target_width * aspect_ratio)
            else:
                ### Portrait
                target_height = 1600
                aspect_ratio = original_width / original_height
                target_width = int(target_height * aspect_ratio)

            if original_width > target_width or original_height > target_height:  ### Code to resize img if original img larger than target img
                img = img.resize((target_width, target_height), Image.LANCZOS)
            
            ### Code to save resized image to BytesIO object
            img_io = BytesIO()
            img_format = 'JPEG' if 'jpeg' in image.content_type else 'PNG'
            img.save(img_io, format=img_format)
            img_io.seek(0)

            ### Code to upload image to S3
            s3_client.upload_fileobj(
                img_io,
                S3_BUCKET_NAME,
                filename,
                ExtraArgs={
                    'ContentType': image.content_type,
                    # 'ACL': 'public-read'  ### Not dealing with ACL at all for now, but possibly later
                }
            )

            ### Code for S3 URL, this is what links the image to it's attributes
            image_url = f'https://{S3_BUCKET_NAME}.s3.amazonaws.com/{filename}'

        new_gallery_entry = Gallery( ### saves uploaded image attributes with S3 url to db
            image_filename=filename,
            image_url=image_url,
            user_id=user_id,
            deck_brand='',
            deck_size=None,  ### values are 'None' because the Gallery model specify these columns as Int type.
            battery_series=None,
            battery_parallel=None,
            motor_size=None,
            motor_kv=None,
            motor_power=None,
            wheel_type='',
            wheel_size='',
            max_speed=None,
            max_range=None,
            other_features=''
        )
        db.session.add(new_gallery_entry)
        db.session.commit()

        return jsonify({
            'message': 'Image uploaded successfully',
            'imageURL': image_url,
            'id': new_gallery_entry.id
        }), 200
    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/gallery/uploaded', methods=['GET'])
def get_uploaded_images():
    try:
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required.'}), 401

        user_id = session['user_id']
        uploaded_images = Gallery.query.filter_by(user_id=user_id).all()

        return jsonify([image.to_dict() for image in uploaded_images])
    except Exception as e:
        app.logger.error(f"Error fetching uploaded images: {e}", exc_info=True)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/gallery/liked', methods=['GET'])
def get_liked_images():
    try:
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required.'}), 401

        user_id = session['user_id']
        liked_images = db.session.query(Gallery).join(Heart, Gallery.id == Heart.gallery_id).filter(Heart.user_id == user_id).all()

        return jsonify([image.to_dict() for image in liked_images])
    except Exception as e:
        app.logger.error(f"Error fetching liked images: {e}", exc_info=True)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/gallery', methods=['GET', 'POST'])
def gallery():
    if request.method == 'POST':
        data = request.json
        gallery_id = data.get('id')
        gallery_item = Gallery.query.get(gallery_id)

        if gallery_item:
            gallery_item.deck_brand = data.get('deck_brand', gallery_item.deck_brand)
            gallery_item.deck_size = data.get('deck_size', gallery_item.deck_size)
            gallery_item.battery_series = data.get('battery_series', gallery_item.battery_series)
            gallery_item.battery_parallel = data.get('battery_parallel', gallery_item.battery_parallel)
            gallery_item.motor_size = data.get('motor_size', gallery_item.motor_size)
            gallery_item.motor_kv = data.get('motor_kv', gallery_item.motor_kv)
            gallery_item.motor_power = data.get('motor_power', gallery_item.motor_power)
            gallery_item.wheel_type = data.get('wheel_type', gallery_item.wheel_type)
            gallery_item.wheel_size = data.get('wheel_size', gallery_item.wheel_size)
            gallery_item.max_speed = data.get('max_speed', gallery_item.max_speed)
            gallery_item.max_range = data.get('max_range', gallery_item.max_range)
            gallery_item.other_features = data.get('other_features', gallery_item.other_features)

            db.session.commit()
            return jsonify({'message': 'Gallery item updated successfully'}), 200
        else:
            return jsonify({'error': 'Gallery item not found'}), 404

    elif request.method == 'GET':
        user_id = session.get('user_id')  ### Code to get the logged-in user's ID, if available
        gallery_items = Gallery.query.all()
        return jsonify([item.to_dict(user_id=user_id) for item in gallery_items])

@app.route('/gallery/delete/<int:image_id>', methods=['DELETE'])
def delete_uploaded_image(image_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401

    user_id = session['user_id']
    uploaded_image = Gallery.query.get(image_id)
    if not uploaded_image or uploaded_image.user_id != user_id:
        return jsonify({'error': 'Uploaded image not found or unauthorized'}), 404

    try:
        s3_client.delete_object(Bucket=S3_BUCKET_NAME, Key=uploaded_image.image_filename)

        Heart.query.filter_by(gallery_id=image_id).delete()  ### Code to manually delete the associated heart relationship

        db.session.delete(uploaded_image)
        db.session.commit()

        return jsonify({'message': 'Uploaded image deleted successfully'}), 200
    except Exception as e:
        print(f"Error deleting image from S3: {e}")
        return jsonify({'error': 'Failed to delete image'}), 500

@app.route('/gallery/top')
def get_top_images():
    top_images = Gallery.query \
        .outerjoin(Heart, Gallery.id == Heart.gallery_id) \
        .group_by(Gallery.id) \
        .order_by(desc(func.count(Heart.gallery_id))) \
        .limit(3) \
        .all()

    return jsonify([image.to_dict() for image in top_images])

### ------------------ GALLERY => HEART ------------------ ###

@app.route('/gallery/heart', methods=['POST'])
def heart_image():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401

    user_id = session['user_id']
    image_id = request.json.get('image_id')
    image = Gallery.query.get(image_id)
    if not image:
        return jsonify({'error': 'Image not found'}), 404

    print(f"Heart request received for image_id: {image_id}, user_id: {user_id}")

    heart_record = Heart.query.filter_by(user_id=user_id, gallery_id=image_id).first()
    if heart_record:
        # print("Heart exists, removing it")
        db.session.delete(heart_record)
        image.hearts -= 1
    else:
        # print("Heart does not exist, adding it")
        new_heart = Heart(user_id=user_id, gallery_id=image_id)
        db.session.add(new_heart)
        image.hearts += 1

    db.session.commit()

    return jsonify({'newHeartState': heart_record is None, 'hearts': image.hearts})

@app.route('/gallery/unheart', methods=['POST'])
def unheart_image():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401

    user_id = session['user_id']
    image_id = request.json.get('image_id')
    image = Gallery.query.get(image_id)
    if not image:
        return jsonify({'error': 'Image not found'}), 404

    heart_record = Heart.query.filter_by(user_id=user_id, gallery_id=image_id).first()
    if heart_record:
        db.session.delete(heart_record)
        image.hearts -= 1
        db.session.commit()
        return jsonify({'message': 'Image unhearted successfully', 'hearts': image.hearts})
    else:
        return jsonify({'error': 'Heart not found'}), 404

### ------------------ GALLERY => REPORT ------------------ ###

@app.route('/gallery/report/<int:image_id>', methods=['POST'])
def report_image(image_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    user_id = session['user_id']
    gallery_item = Gallery.query.get(image_id)
    existing_report = Report.query.filter_by(user_id=user_id, gallery_id=image_id).first()

    if existing_report:
        return jsonify({'error': 'You have already reported this image'}), 400
    
    new_report = Report(user_id=user_id, gallery_id=image_id)
    db.session.add(new_report)

    if gallery_item and gallery_item.reports.count() >= 3:
        try:

            s3_client.delete_object(Bucket=S3_BUCKET_NAME, Key=gallery_item.image_filename)

            db.session.delete(gallery_item)
            db.session.commit()

            return jsonify({'message': 'Image reported and deleted successfully'}), 200
        except Exception as e:
            print(f"Error deleting image from S3: {e}")

            return jsonify({'error': 'Failed to delete image from S3'}), 500
    else:
        db.session.commit() ### if img report count is not at the limit, then simply just log the new report count to db
        
        return jsonify({'message': 'Image reported successfully'}), 200

### ------------------ HANDLE EXCEPTION ERRORS ------------------ ###

@app.errorhandler(Exception)
def handle_exception(e):
    response = {"error": "A server error occurred", "details": str(e)}

    return jsonify(response), 500

### -------- ROBOTS.TXT FOR WEB CRAWLERS LIKE GOOGLE, BING -------- ###

@app.route('/robots.txt')
def static_from_root():
    return send_from_directory(app.static_folder, 'robots.txt')


if __name__ == '__main__':   ### not needed for production build on render, but doesn't hurt to keep for development server
    app.run(port=5555, debug=True)
