#!/usr/bin/env python3

# Remote library imports
from flask import Flask, jsonify, make_response, request, session, json
from flask_restful import Resource
from flask_migrate import Migrate
from flask_cors import CORS

# Local imports
from config import app, db, api
from models import db, Board, Deck, Wheel, Truck, Motor, Battery, Controller, Remote, Max_speed, Range
import os

# API imports
# import openai
# from openai import OpenAI

# client = OpenAI()

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


# API Secret Key
# openai_api_key = os.getenv('OPENAI_API_KEY')
# openai.api_key = openai_api_key


# another way of getting the secret key??
# os.environ.get('OPENAI_API_KEY')


# Instantiate CORS
# CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})



# @app.route('/')
# def home():
#     return '<h1>Server Home</h1>'

GPT_MODEL = "gpt-3.5-turbo-0613"

openai_URL = "https://api.openai.com/"


# def openai_data_request(messages, tools=None, tool_choice=None, model=GPT_MODEL):
#     headers: {
#         "content-Type": "appliation/json",
#         "Authorization": "Bearer" + openai_api_key
#     }
#     json_data = {"model": model, "messages": messages}
#     try:
#         response = request.post(
#             openai_URL + "v1/chat/completions",
#             headers=headers,
#             json=json_data
#         )
#     except Exception as e:
#         print("Unable to generate Response.")
#         print(f'Exception: {e}')
#         return e



completion = client.chat.completions.create(
model="gpt-3.5-turbo",
messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
])


### ------------------ OPENAI API REQUESTS ------------------ ###
@app.post('/generateSpecs')
def generate_specs():
    pass



### ------------------ USER SIGNUP ------------------ ###


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    new_user = User(email=data['email'])
    new_user.password_hash = data['password']

    db.session.add(new_user)
    db.session.commit()

    return {'message': 'Registration Successful!'}, 201



### ------------------ CHECK SESSION, LOGIN-LOGOUT ------------------ ###



@app.route('/check_session')
def check_session():
    user_id = session.get('user_id')
    user = User.query.filter(User.id == user_id).first()

    if not user:
        return {'error': 'Invalid Session.'}, 401
    
    return {'message': 'Session Valid, Access Granted'}, 200


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # check if user exists
    user = User.query.filter(User.email == data['email']).first()

    if not user:
        return make_response(jsonify({'error': 'User not found.'}), 404)
    
    if user.authenticate(data['password']):  # check if pwd match
        session['user_id'] = user.id
        user_data = {
            'id': user.id,
            'email': user.email
        }
        return make_response(jsonify({'message': 'Login successful!', 'user': user_data}), 200)
    else:
        # password did not match, send error resp
        return make_response(jsonify({'error': 'Invalid email or password.'}), 401)


@app.delete('/logout')
def logout():
    session.pop('user_id')

    return {'message': 'Successfully logged out.'}, 200



### ------------------ USERS ------------------ ###

### ------------------ BOARDS ------------------ ###

app.get('/boards')
def get_boards():
    boards = Board.query.all()
    return make_response(jsonify([board.to_dict() for board in boards]), 200)


app.delete('/boards/<int:board_id>')
def delete_board_by_id():
    board = Board.query.filter(Board.id == id).first()

    if board:
        db.session.delete(board)
        db.session.commit()
        return {"message": "Board deleted successfully."}, 200
    else:
        return {"error": "Board not found."}, 404


### ------------------ QUESTIONS ------------------ ###



### ------------------ FORUMS ------------------ ###


app.get('/forums')
def get_posts():
    posts = Forum.query.all()
    return make_response(jsonify([post.to_dict() for post in posts]), 200)


app.patch('/forum/<int:id>')
def edit_post_by_id(id):
    data = request.json

    Forum.query.filter(Forum.id == id).update(data)
    db.session.commit()
    
    post = Forum.query.filter(Forum.id == id).first()
    
    return make_response(jsonify(post.to_dict()), 200)


app.delete('/forum/<int:id>')
def delete_post_by_id():
    post = Forum.query.filter(Forum.id == id).first()

    if post:
        db.session.delete(post)
        db.session.commit()
        return {"message": "Post deleted successfully."}, 200
    else:
        return {"error": "Post not found."}, 404





if __name__ == '__main__':
    app.run(port=5555, debug=True)
