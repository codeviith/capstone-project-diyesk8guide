#!/usr/bin/env python3

# Remote library imports
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# Local imports
from models import db, User, Question, Forum, Board, Deck, Wheel, Truck, Motor, Battery, Controller, Remote, Max_speed, Range
import os

# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# DATABASE = os.environ.get(
#     "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# app.secret_key = " "


# Instantiate CORS
CORS(app)


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
