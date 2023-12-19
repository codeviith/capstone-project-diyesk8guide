from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from sqlalchemy import DateTime, desc

from config import db

### ------------------ USER (ONE) ------------------ ###


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serializer_rule = ('-boards.users', '-gurus.users', '-qna.users')

    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    rider_stance = db.Column(db.String, nullable=False)
    boards_owned = db.Column(db.String)


    boards = db.relationship('Board', back_populates='users')
    gurus = db.relationship('Guru', back_populates='users')
    qna = db.relationship('Qna', back_populates='users')



### ------------------ BOARD (ONE) ------------------ ###
class Board(db.Model, SerializerMixin):
    __tablename__ = 'boards'

    serializer_rule = ('-users.boards',)

    id = db.Column(db.Integer, primary_key=True, unique=True)

    deck_type = db.Column(db.String, nullable=False)
    deck_length = db.Column(db.String, nullable=False)
    deck_material = db.Column(db.String, nullable=False)
    truck_type = db.Column(db.String, nullable=False)
    truck_width = db.Column(db.String, nullable=False)
    controller_feature = db.Column(db.String, nullable=False)
    controller_type = db.Column(db.String, nullable=False)
    remote_feature = db.Column(db.String, nullable=False)
    remote_type = db.Column(db.String, nullable=False)
    motor_size = db.Column(db.String, nullable=False)
    motor_kv = db.Column(db.String, nullable=False)
    wheel_size = db.Column(db.String, nullable=False)
    wheel_type = db.Column(db.String, nullable=False)
    battery_voltage = db.Column(db.String, nullable=False)
    battery_type = db.Column(db.String, nullable=False)
    battery_capacity = db.Column(db.String, nullable=False)
    battery_configuration = db.Column(db.String, nullable=False)
    range_mileage = db.Column(db.String, nullable=False)
    
    image_url = db.Column(db.String, nullable=False)
    timestamp = db.Column(DateTime, default=datetime.utcnow, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    users = db.relationship('User', back_populates='boards')



### ------------------ GURU (MANY) ------------------ ###


class Guru(db.Model, SerializerMixin):
    __tablename__ = 'gurus'

    serializer_rule = ('-users.gurus',)

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_input = db.Column(db.String, nullable=False)
    answer = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    users = db.relationship('User', back_populates='gurus')



### ------------------ Qna (ONE) ------------------ ###

class Qna(db.Model, SerializerMixin):
    __tablename__ = 'qna'


    serializer_rule = ('-users.qna',)

    id = db.Column(db.Integer, primary_key=True, unique=True)
    post = db.Column(db.String, nullable=False)
    reply = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    users = db.relationship('User', back_populates='qna')
    replies = db.relationship('Reply', back_populates='qna', cascade='all, delete-orphan')



class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    reply = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    qna_id = db.Column(db.Integer, db.ForeignKey('qna.id'))
    
    qna = db.relationship('Qna', back_populates='replies')

