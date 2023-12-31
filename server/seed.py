#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random
# from faker import Faker

# Local imports
from app import app
# from models import db, User, Question, Forum, Board, Deck, Wheel, Truck, Motor, Battery, Controller, Remote, Max_speed, Range
from models import db, Board, Guru, User, Deck, Wheel, Truck, Motor, Battery, Controller, Remote, Max_speed, Range

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
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
        Guru.query.delete()
        
        db.session.commit()

        print("Database cleared")


        # print("Creating users...")
        # user1 = User(email="user1@example.com", password="pwd1")
        # db.session.add(user1)


        # print("Creating boards...")
        # boards = []
        # for _ in range(5):
        #     board = Board(
        #         board=faker.word()
        #     )
        #     boards.append(board)
        #     db.session.add_all(boards)
        #     db.session.commit()


        # print("Creating decks...")
        # deck1 = Deck(type="Drop-through deck for stability and comfort",
        #     length="38 inches",
        #     materal="7-ply maple"
        #     )
        # db.session.add(deck1)
        # db.session.commit()



        # Create users
        user1 = User(email='user1@yahoo.com', password_hash='password1', fname='John', lname='Doe', rider_stance='Goofy', boards_owned='')
        user2 = User(email='user2@yahoo.com', password_hash='password2', fname='Jane', lname='Doe', rider_stance='Regular', boards_owned='')


        # Create decks
        deck1 = Deck(type='Type1', length='Length1', material='Material1')
        deck2 = Deck(type='Type2', length='Length2', material='Material2')

        # Create wheels
        # wheel1 = Wheel(size='90mm', type='78A')
        # wheel2 = Wheel(size='175mm', type='Pneumatic')

        # Create trucks
        truck1 = Truck(type='Type1', width='Width1')
        truck2 = Truck(type='Type2', width='Width2')

        # Create motors
        motor1 = Motor(size='Size1', type='Type1', kv='KV1')
        motor2 = Motor(size='Size2', type='Type2', kv='KV2')

        # Create batteries
        battery1 = Battery(voltage='Voltage1', type='Type1', capacity='Capacity1', configuration='Config1')
        battery2 = Battery(voltage='Voltage2', type='Type2', capacity='Capacity2', configuration='Config2')

        # Create controllers
        controller1 = Controller(features='Features1', type='Type1')
        controller2 = Controller(features='Features2', type='Type2')

        # Create remotes
        remote1 = Remote(features='Features1', type='Type1')
        remote2 = Remote(features='Features2', type='Type2')

        # Create max_speeds
        max_speed1 = Max_speed(speed='Speed1')
        max_speed2 = Max_speed(speed='Speed2')

        # Create ranges
        range1 = Range(range='Range1')
        range2 = Range(range='Range2')

        # Create boards
        # board1 = Board(user=user1)
        # board2 = Board(user=user2)
        board1 = Board(deck=deck1, truck=truck1, motor=motor1, battery=battery1, controller=controller1, remote=remote1, max_speed=max_speed1, range=range1)
        board2 = Board(deck=deck2, truck=truck2, motor=motor2, battery=battery2, controller=controller2, remote=remote2, max_speed=max_speed2, range=range2)


        # Create gurus
        guru1 = Guru(user_input="question1", answer="answer1")
        guru2 = Guru(user_input="question2", answer="answer2")

        # Create forums
        # forum1 = Forum(user=user1)
        # forum2 = Forum(user=user2)

        # Commit to the database
        # db.session.add_all([user1, user2, board1, board2, deck1, deck2, wheel1, wheel2, truck1, truck2,
        #                     motor1, motor2, battery1, battery2, controller1, controller2, remote1, remote2,
        #                     max_speed1, max_speed2, range1, range2, question1, question2, forum1, forum2])
        db.session.add_all([board1, board2, deck1, deck2, truck1, truck2,
                            motor1, motor2, battery1, battery2, controller1, controller2, remote1, remote2,
                            max_speed1, max_speed2, range1, range2])
        db.session.commit()


        print("Seeding complete!")


