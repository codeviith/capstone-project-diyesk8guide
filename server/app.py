#!/usr/bin/env python3

# Remote library imports
from flask import Flask, jsonify, make_response, request, session, json, redirect
from flask_restful import Resource
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from sqlalchemy import desc, func, MetaData
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from PIL import Image
import boto3
from botocore.exceptions import NoCredentialsError
import tempfile

# Local imports
from models import Board, Guru, User, ContactUs, Gallery, Heart, Report
from config import db, bcrypt
import os

# API imports
from openai import OpenAI

# Load environment variables
load_dotenv()

# Instantiate app
app = Flask(__name__)

# Set app attributes
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'   ### uncomment to test code on development server
# app.config['IMAGE_URL'] = '/home/codeviith/Development/code/phase-5/capstone-project/diyesk8guide/server/gallery'  ### modify value based on file storage location
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')   ### uncomment for production build on render
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['BASE_URL'] = os.environ.get('BASE_URL', 'http://127.0.0.1:5555')  
###### IMPORTANT!!! make sure to configure the 'BASE_URL' environment variable on Render as either Render backend URL or my custom domain: www.diyesk8guide.com #####

app.json.compact = False


# Instantiate db
db.init_app(app)
migrate = Migrate(app, db)

# API Secret Keys
openai_api_key = os.environ.get('OPENAI_API_KEY')  ### or os.getenv('OPENAI_API_KEY')
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')
client = OpenAI(api_key=openai_api_key)

# Instantiate CORS
# CORS(app, supports_credentials=True)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)


# Initialize Bcrypt
bcrypt.init_app(app)


### ------------------ AWS S3 CLIENT ------------------ ###


s3_client = boto3.client(
    's3',
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
    region_name=os.environ.get('AWS_REGION')
)

S3_BUCKET = 'diyesk8guide-disk'


### ------------------ AWS S3 HELPER FUNCTION(S) ------------------ ###


def upload_file_to_s3(file, bucket_name, object_name=None):
    if object_name is None:
        object_name = file.filename

    try:
        s3_client.upload_fileobj(file, bucket_name, object_name)
        return True
    except Exception as e:
        print(f"Error uploading file to S3: {e}")
        return False


### ------------------ IMG RESIZE HELPER FUNCTION(S) ------------------ ###


def resize_image(image_path, output_path, base_width=1024):
    img = Image.open(image_path)
    w_percent = (base_width / float(img.size[0]))
    h_size = int((float(img.size[1]) * float(w_percent)))
    img = img.resize((base_width, h_size))
    img.save(output_path)


### ------------------ UNIVERSAL HELPER FUNCTION(S) ------------------ ###


def is_authenticated():
    return 'user_id' in session


### ------------------ OPENAI API REQUESTS ------------------ ###


guru_instructions = "You are an expert in electric skateboards, please answer questions from prospective builders while adhering to the following instructions: 1. You will come up with the most appropriate response that suits best for the builder's question. If you are unable to provide an appropriate response to the builder, then please provide an appropriate reason. 2.Please refrain from engaing in any other conversation that isn't related to the field of electric skateboards, and in the case that the builder asks a question that is unrelated to and/or outside the scope of electric skateboards, please respond with: 'I apologize but I can only answer questions that are related to electric skateboards.' and end with an appropriate response."

@app.post('/guru_assistant')
def guru_assistant():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401

    user_id = session['user_id']
    data = request.get_json()
    user_input = data.get('user_input')

    if not user_input:
        return make_response(
            jsonify({"error": "User input cannot be empty."}), 400
        )
    
    try:
        messages = [
            {"role": "system", "content": guru_instructions},
            {"role": "user", "content": f'I have a question about: {user_input}.'}
            ]
        completion = client.chat.completions.create(
            model="gpt-4-1106-preview",
            messages=messages,
            max_tokens=1000
        )

        answer = completion.choices[0].message.content

        ### Saves generated response into database for a specific user
        guru_entry = Guru(user_input=user_input, answer=answer, user_id=user_id)
        db.session.add(guru_entry)
        db.session.commit()

        return make_response(
            jsonify({"content": answer}), 200
        )
    except Exception as e:
        print(e)
        
        return make_response(
            jsonify({"error": "Cannot formulate a response."}), 500
        )


### ------------------ AUTHENTICATION ------------------ ###


def is_logged_in():
    return 'user_id' in session


### ------------------ LOG IN ------------------ ###


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        session['user_id'] = user.id
        return jsonify({'success': True, 'message': 'Logged in successfully'}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401


### ------------------ LOG OUT ------------------ ###

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200


### ------------------ SIGN UP ------------------ ###


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']
    fname = data['firstName']
    lname = data['lastName']
    rider_stance = data['riderStance']
    boards_owned = ','.join(data['boardsOwned'])  # making it comma-separated string

    ### Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already in use'}), 409

    ### Create new user
    new_user = User(email=email, fname=fname, lname=lname, rider_stance=rider_stance, boards_owned=boards_owned)
    new_user.password_hash = password  ### Sets the password hash

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Account created successfully'}), 201


### ------------------ COOKIE ------------------ ###


@app.route('/check_session', methods=['GET'])
def check_session():
    if 'user_id' in session:
        return jsonify({'logged_in': True}), 200
    else:
        return jsonify({'logged_in': False}), 200


### ------------------ USER ------------------ ###


@app.route('/user_data', methods=['GET'])
def get_user_data():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required.'}), 401

    user = User.query.get(session['user_id'])
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({'error': 'User not found.'}), 404


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

    user.password_hash = new_password  ## Code to trigger setter in the User model
    db.session.commit()

    return jsonify({'message': 'Password changed successfully'}), 200


### ------------------ BOARDS ------------------ ###


@app.route('/boards', methods=['GET'])
def get_boards():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required.'}), 401
    
    user_id = session['user_id']
    boards = Board.query.filter_by(user_id=user_id).all()
    return make_response(jsonify([board.to_dict() for board in boards]), 200)


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
    # speed = data.get('speed', '')
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
        return jsonify({'error': str(e)})


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


### ------------------ CONTACTUS ------------------ ###


@app.route('/contact_us', methods=['POST'])
def contact_form():
    try:
        if 'user_id' not in session:
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

        return jsonify({'message': 'Your message has been successfully submitted'}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'An error occurred while processing your request'}), 500


### ------------------ GALLERY ------------------ ###


@app.route('/images/<filename>')
def serve_image(filename):
    image_url = f"https://{S3_BUCKET}.s3.amazonaws.com/{filename}"
    return redirect(image_url)


@app.route('/gallery/upload', methods=['POST'])
def upload_image():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required.'}), 401

    user_id = session['user_id']
    image = request.files.get('image')

    if not image:
        return jsonify({'error': 'No image provided'}), 400

    filename = secure_filename(image.filename)

    temp_dir = tempfile.gettempdir()  ### using temp_dir is a more portable/universal method that don't rely on a specific os (best for multi-Paas platforms)
    temp_path = os.path.join(temp_dir, f"temp_{filename}")
    final_path = os.path.join(temp_dir, filename)


    try:
        image.save(temp_path)  ### code to save img temp after resizing
        
        with Image.open(temp_path) as img:  ### code to open img with pillow and resize if too big
            width, height = img.size
            if width > 1920 or height > 1080:
                resize_image(temp_path, final_path)
            elif width > 1080 or height > 1920:
                resize_image(temp_path, final_path)
            else:
                os.rename(temp_path, final_path)
        
        with open(final_path, 'rb') as data:  ### this code will upload the original or resized image to S3
            if upload_file_to_s3(data, S3_BUCKET, object_name=filename):
                new_gallery_entry = Gallery(
                    image_filename=filename,
                    user_id=user_id,
                    deck_brand='',
                    deck_size=request.form.get('deck_size'),
                    battery_series=request.form.get('battery_series'),
                    battery_parallel=request.form.get('battery_parallel'),
                    motor_size=request.form.get('motor_size'),
                    motor_kv=request.form.get('motor_kv'),
                    motor_power=request.form.get('motor_power'),
                    wheel_type='',
                    wheel_size='',
                    max_speed=request.form.get('max_speed'),
                    max_range=request.form.get('max_range'),
                    other_features=''
                )
                db.session.add(new_gallery_entry)
                db.session.commit()

                return jsonify({'message': 'Image uploaded successfully', 'filePath': filename}), 200
            else:
                return jsonify({'error': 'Failed to upload image to S3'}), 500
    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({'error': str(e)}), 500
    finally:  ### code to remove temp files
        if os.path.exists(temp_path):
            os.remove(temp_path)
        if os.path.exists(final_path):
            os.remove(final_path)


@app.route('/gallery/uploaded', methods=['GET'])
def get_uploaded_images():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required.'}), 401

    user_id = session['user_id']
    uploaded_images = Gallery.query.filter_by(user_id=user_id).all()

    return jsonify([image.to_dict() for image in uploaded_images])


@app.route('/gallery/liked', methods=['GET'])
def get_liked_images():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required.'}), 401

    user_id = session['user_id']
    liked_images = db.session.query(Gallery).join(Heart, Gallery.id == Heart.gallery_id).filter(Heart.user_id == user_id).all() # Query all items that the user has liked

    return jsonify([image.to_dict() for image in liked_images])


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
        s3_client.delete_object(Bucket=S3_BUCKET, Key=uploaded_image.image_filename)

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

    if gallery_item and gallery_item.reports.count() >= 10:
        db.session.delete(gallery_item)

    db.session.commit()
    return jsonify({'message': 'Image reported successfully'}), 200

if __name__ == '__main__':   ### not needed for production build on render, but doesn't hurt to keep for development server
    app.run(port=5555, debug=True)
