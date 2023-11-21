#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random
# from faker import Faker

# Local imports
from app import app
# from models import db, User, Question, Forum, Board, Deck, Wheel, Truck, Motor, Battery, Controller, Remote, Max_speed, Range
from models import db, Board, Deck, Wheel, Truck, Motor, Battery, Controller, Remote, Max_speed, Range

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        # faker = Faker()

        # User.query.delete()
        # Question.query.delete()
        # Forum.query.delete()
        Board.query.delete()
        Deck.query.delete()
        Wheel.query.delete()
        Truck.query.delete()
        Motor.query.delete()
        Battery.query.delete()
        Controller.query.delete()
        Remote.query.delete()
        Max_speed.query.delete()
        Range.query.delete()

        print("Database cleared")
