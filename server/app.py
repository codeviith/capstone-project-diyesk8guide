#!/usr/bin/env python3

# Remote library imports
from flask import Flask, jsonify, make_response, request, session, json, send_from_directory
from flask_restful import Resource
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from sqlalchemy import desc, func
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename


# Local imports
from config import app, db, api
from models import db, Board, Guru, User, ContactUs, Gallery, Heart
# from guru_assistant import guru_assistant
import os

# API imports
from openai import OpenAI


### This puts app.db in server directory???
# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# DATABASE = os.environ.get(
#     "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.json.compact = False

# Instantiate db
db.init_app(app)
migrate = Migrate()
migrate.init_app(app, db)



# API Secret Keys
load_dotenv()
openai_api_key = os.environ.get('OPENAI_API_KEY')
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')
# print("Flask Secret Key:", app.config['SECRET_KEY'])
client = OpenAI(api_key=openai_api_key)
# openai.api_key = openai_api_key


# another way of getting the secret key using os.getenv??
# os.getenv('OPENAI_API_KEY')


# Instantiate CORS
CORS(app, supports_credentials=True)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Initialize Bcrypt
bcrypt = Bcrypt(app)


### ------------------ UNIVERSAL HELPER FUNCTIONS ------------------ ###


def is_authenticated():
    return 'user_id' in session


### ------------------ OPENAI API REQUESTS ------------------ ###
guru_instructions = "You are an expert in electric skateboards who will be answering questions from prospective builders, aka users.Please follow the instructions below: 1. You will come up with the most appropriate response that suits best for the builder's question. If you are unable to provide an appropriate response to the builder, then please refer them to the following websites: https://electric-skateboard.builders/ , https://forum.esk8.news/ 2. Please refrain from engaing in any other conversation that isn't related to the field of electric skateboards, and in the case that the builder asks a question that is unrelated to and/or outside the scope of electric skateboards, please respond with: 'I apologize but I can only answer questions that are related to electric skateboards.' and end with an appropriate response."

### Not using guru_assistant.py

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
            max_tokens=500
        )

        answer = completion.choices[0].message.content

        #Save generated response into the database for that specific user
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
    boards_owned = ','.join(data['boardsOwned'])  # Assuming boards_owned as a comma-separated string

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already in use'}), 409

    # Create new user
    new_user = User(email=email, fname=fname, lname=lname, rider_stance=rider_stance, boards_owned=boards_owned)
    new_user.password_hash = password  # Set the password hash

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
    # Query boards, order in descending order, then retrieve first one
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


# append data directly to Board:
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
    wheel_size = data.get('wheelSize', '')
    wheel_type = data.get('wheelType', '')
    battery_voltage = data.get('batteryVoltage', '')
    battery_type = data.get('batteryType', '')
    battery_capacity = data.get('batteryCapacity', '')
    battery_configuration = data.get('batteryConfiguration', '')
    range_mileage = data.get('mileage', '')
    image_url = data.get('imageURL', '')

    board_entry = Board(user_id=user_id, deck_type=deck_type, deck_length=deck_length, deck_material=deck_material, truck_type=truck_type, truck_width=truck_width, controller_feature=controller_feature, controller_type=controller_type, remote_feature=remote_feature, remote_type=remote_type, motor_size=motor_size, motor_kv=motor_kv, wheel_size=wheel_size, wheel_type=wheel_type, battery_voltage=battery_voltage, battery_type=battery_type, battery_capacity=battery_capacity, battery_configuration=battery_configuration, range_mileage=range_mileage, image_url=image_url)
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
def handle_contact_form():
    try:
        # Get data from the request's JSON body
        data = request.json

        # Create a new ContactUs instance
        new_contact = ContactUs(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            message=data['message']
        )

        # Add the new record to the database
        db.session.add(new_contact)
        db.session.commit()

        # Return a success response
        return jsonify({'message': 'Your message has been successfully submitted'}), 200

    except Exception as e:
        # Handle exceptions (e.g., missing data, database errors)
        print(str(e))
        return jsonify({'error': 'An error occurred while processing your request'}), 500



### ------------------ GALLERY ------------------ ###

# Directory for incoming uploads
IMAGE_UPLOAD_FOLDER = '/home/codeviith/Development/code/phase-5/capstone-project/diyesk8guide/server/gallery'

# Making sure directory exists
os.makedirs(IMAGE_UPLOAD_FOLDER, exist_ok=True)


@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory(IMAGE_UPLOAD_FOLDER, filename)


@app.route('/gallery/upload', methods=['POST'])
def upload_image():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required.'}), 401
    
    user_id = session['user_id']
    image = request.files.get('image')

    if not image:
        return jsonify({'error': 'No image provided'}), 400

    filename = secure_filename(image.filename)
    image_path = os.path.join(IMAGE_UPLOAD_FOLDER, filename)

    try:
        image.save(image_path)
        print(f"Image saved at {image_path}")

        # Create and save the gallery entry with dropdown data
        new_gallery_entry = Gallery(
            image_filename=filename,
            user_id=user_id,
            battery_type='',
            motor_type='',
            wheel_type='',
            truck_type='',
            max_speed=''
        )
        db.session.add(new_gallery_entry)
        db.session.commit()

        return jsonify({
            'message': 'Image uploaded successfully',
            'filePath': image_path,
            'id': new_gallery_entry.id
        }), 200
    except Exception as e:
        print(f"Error saving image: {e}")
        return jsonify({'error': str(e)}), 500


# @app.route('/user_gallery', methods=['GET'])
# def gallery():
#     if 'user_id' not in session:
#         return jsonify({'error': 'Authentication required'}), 401

#     user_id = session['user_id']
#     gallery_items = Gallery.query.filter_by(user_id=user_id).all()
#     return jsonify([item.to_dict(user_id=user_id) for item in gallery_items])


@app.route('/gallery', methods=['GET', 'POST'])
def gallery():
    if request.method == 'POST':
        # This part will handle the dropdown data submission for a gallery item
        data = request.json
        gallery_id = data.get('id')

        # Fetch the gallery item by ID
        gallery_item = Gallery.query.get(gallery_id)

        if gallery_item:
            # Update the gallery item with the dropdown data
            gallery_item.battery_type = data.get('batteryType', gallery_item.battery_type)
            gallery_item.motor_type = data.get('motorType', gallery_item.motor_type)
            gallery_item.wheel_type = data.get('wheelType', gallery_item.wheel_type)
            gallery_item.truck_type = data.get('truckType', gallery_item.truck_type)
            gallery_item.max_speed = data.get('maxSpeed', gallery_item.max_speed)

            db.session.commit()
            return jsonify({'message': 'Gallery item updated successfully'}), 200
        else:
            return jsonify({'error': 'Gallery item not found'}), 404

    elif request.method == 'GET':
        user_id = session.get('user_id')  # Get the logged-in user's ID, if available
        gallery_items = Gallery.query.all()
        return jsonify([item.to_dict(user_id=user_id) for item in gallery_items])

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
        print("Heart exists, removing it")
        # Existing heart is removed
        db.session.delete(heart_record)
        image.hearts -= 1
    else:
        print("Heart does not exist, adding it")
        # New heart is added
        new_heart = Heart(user_id=user_id, gallery_id=image_id)
        db.session.add(new_heart)
        image.hearts += 1

    db.session.commit()

    return jsonify({'newHeartState': heart_record is None, 'hearts': image.hearts})


@app.route('/gallery/top')
def get_top_images():
    top_images = Gallery.query \
        .outerjoin(Heart, Gallery.id == Heart.gallery_id) \
        .group_by(Gallery.id) \
        .order_by(desc(func.count(Heart.gallery_id))) \
        .limit(3) \
        .all()
    
    return jsonify([image.to_dict() for image in top_images])


if __name__ == '__main__':
    app.run(port=5555, debug=True)














# @app.route('/gallery/top')
# def get_top_images():
#     top_images = Gallery.query.order_by(desc(Gallery.Heart)).limit(3).all()
#     return jsonify([image.to_dict() for image in top_images])
