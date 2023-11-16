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

### ------------------ USER SIGNUP ------------------ ###

### ------------------ SESSION LOGIN-LOGOUT ------------------ ###

### ------------------ USERS ------------------ ###

### ------------------ BOARDS ------------------ ###

### ------------------ QUESTIONS ------------------ ###

### ------------------ POSTS ------------------ ###



@app.route('/')
def home():
    return '<h1>Server Home</h1>'







if __name__ == '__main__':
    app.run(port=5555, debug=True)
