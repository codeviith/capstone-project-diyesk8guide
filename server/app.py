#!/usr/bin/env python3

# Remote library imports
from flask import Flask, jsonify, make_response, request, session
from flask_restful import Resource
from flask_migrate import Migrate
from flask_cors import CORS

# Local imports
from config import app, db, api
from models import db, Board, Deck, Wheel, Truck, Motor, Battery, Controller, Remote, Max_speed, Range
import os


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

# Secret Key
# app.secret_key = " "


# Instantiate CORS
# CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})



### ------------------ ROUTES ------------------ ###

@app.route('/')
def home():
    return '<h1>Server Home</h1>'



### ------------------ USER SIGNUP ------------------ ###

### ------------------ SESSION LOGIN-LOGOUT ------------------ ###

### ------------------ USERS ------------------ ###

### ------------------ BOARDS ------------------ ###

app.get('/boards')
def get_boards():
    boards = Board.query.all()
    return make_response([board.to_dict() for board in boards], 200)


app.delete('/boards/<int:board_id>')
def delete_board_by_id():
    board = Board.query.filter(Board.id == id).first()

    if board:
        db.session.delete(board)
        db.session.commit()
        return ({"message": "Board deleted successfully."}), 200
    else:
        return ({"error": "Board not found."}), 404


### ------------------ QUESTIONS ------------------ ###



### ------------------ FORUMS ------------------ ###


app.get('/forums')
def get_posts():
    posts = Forum.query.all()
    return make_response([post.to_dict() for post in posts], 200)


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
        return ({"message": "Post deleted successfully."}), 200
    else:
        return ({"error": "Post not found."}), 404





if __name__ == '__main__':
    app.run(port=5555, debug=True)
