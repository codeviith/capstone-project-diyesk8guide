#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random
# from faker import Faker

# Local imports
from app import app
from models import db, Board, Guru, User, Gallery, Heart, ContactUs

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        # faker = Faker()

        User.query.delete()
        Heart.query.delete()
        Board.query.delete()
        Guru.query.delete()
        Gallery.query.delete()
        ContactUs.query.delete()

        db.session.commit()

        print("Database cleared")
