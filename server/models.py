from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from sqlalchemy import DateTime, desc
from sqlalchemy.orm import validates

from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, app

bcrypt = Bcrypt()

### ------------------ USER ------------------ ###


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serializer_rule = ('-boards.users', '-gurus.users', '-heart_count.users')

    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    rider_stance = db.Column(db.String, nullable=False)
    boards_owned = db.Column(db.String)


    boards = db.relationship('Board', back_populates='users')
    gurus = db.relationship('Guru', back_populates='users')
    heart_count = db.relationship('Heart', back_populates='users')

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'fname': self.fname,
            'lname': self.lname,
            'rider_stance': self.rider_stance,
            'boards_owned': self.boards_owned
        }


    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, new_pass):
        self._password_hash = bcrypt.generate_password_hash(new_pass).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, 
            password.encode('utf-8')
        )


    @validates('email')
    def validate_email(self, key, email):
        if len(email) == 0:
            raise ValueError('Email must not be empty!')
        
        return email
    
    @validates('password')
    def validate_password(self, key, password):
        if len(password) == 0:
            raise ValueError('Passowrd must not be empty!')
        
        return password


    def __repr__(self):
        return f'<User {self.id}>'


### ------------------ BOARD ------------------ ###
class Board(db.Model, SerializerMixin):
    __tablename__ = 'boards'

    serializer_rule = ('-users.boards',)

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

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

    def to_dict(self):
        return {
            'id': self.id,
            'deck_type': self.deck_type,
            'deck_length': self.deck_length,
            'deck_material': self.deck_material,
            'truck_type': self.truck_type,
            'truck_width': self.truck_width,
            'controller_feature': self.controller_feature,
            'controller_type': self.controller_type,
            'remote_feature': self.remote_feature,
            'remote_type': self.remote_type,
            'motor_size': self.motor_size,
            'motor_kv': self.motor_kv,
            'wheel_size': self.wheel_size,
            'wheel_type': self.wheel_type,
            'battery_voltage': self.battery_voltage,
            'battery_type': self.battery_type,
            'battery_capacity': self.battery_capacity,
            'battery_configuration': self.battery_configuration,
            'range_mileage': self.range_mileage,
            'image_url': self.image_url,
            'timestamp': self.timestamp.isoformat(),  # Formatting the datetime object
            'user_id': self.user_id
        }


    def __repr__(self):
        return f'<Board {self.id}>'

### ------------------ GURU ------------------ ###


class Guru(db.Model, SerializerMixin):
    __tablename__ = 'gurus'

    serializer_rule = ('-users.gurus',)

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_input = db.Column(db.String, nullable=False)
    answer = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    users = db.relationship('User', back_populates='gurus')

    def to_dict(self):
        return {
            'id': self.id,
            'user_input': self.user_input,
            'answer': self.answer,
            'user_id': self.user_id
        }


    def __repr__(self):
        return f'<Guru {self.id}>'


### ------------------ GALLERY ------------------ ###


class Gallery(db.Model, SerializerMixin):
    __tablename__ = 'gallery'

    serializer_rule = ('-heart_count.gallery',)

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image_filename = db.Column(db.String, nullable=False)
    deck_brand = db.Column(db.String, nullable=False)
    deck_size = db.Column(db.Integer, nullable=False)
    battery_series = db.Column(db.Integer, nullable=False)
    battery_parallel = db.Column(db.Integer, nullable=False)
    motor_size = db.Column(db.Integer, nullable=False)
    motor_kv = db.Column(db.Integer, nullable=False)
    motor_power = db.Column(db.Integer, nullable=False)
    wheel_type = db.Column(db.String, nullable=False)
    truck_type = db.Column(db.String, nullable=False)
    max_speed = db.Column(db.Integer, nullable=False)
    max_range = db.Column(db.Integer, nullable=False)
    hearts = db.Column(db.Integer, default=0)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, image_filename, user_id, deck_brand, deck_size, battery_series, battery_parallel, motor_size, motor_kv, motor_power, wheel_type, truck_type, max_speed, max_range):
        self.image_filename = image_filename
        self.user_id = user_id
        self.deck_brand = deck_brand
        self.deck_size = deck_size
        self.battery_series = battery_series
        self.battery_parallel = battery_parallel
        self.motor_size = motor_size
        self.motor_kv = motor_kv
        self.motor_power = motor_power
        self.wheel_type = wheel_type
        self.truck_type = truck_type
        self.max_speed = max_speed
        self.max_range = max_range
        self.hearts = 0

    def is_hearted_by_user(self, user_id):
        heart = Heart.query.filter_by(user_id=user_id, gallery_id=self.id).first()
        return heart is not None

    def to_dict(self, user_id=None):
        base_url = app.config['BASE_URL']
        data = {
            'id': self.id,
            'image_filename': self.image_filename,
            'image_url': f'{base_url}/images/{self.image_filename}',
            'deck_brand': self.deck_brand,
            'deck_size': self.deck_size,
            'battery_series': self.battery_series,
            'battery_parallel': self.battery_parallel,
            'motor_size': self.motor_size,
            'motor_kv': self.motor_kv,
            'motor_power': self.motor_power,
            'wheel_type': self.wheel_type,
            'truck_type': self.truck_type,
            'max_speed': self.max_speed,
            'max_range': self.max_range,
            'hearts': self.hearts
        }
        if user_id is not None:
            data['isHearted'] = self.is_hearted_by_user(user_id)
        return data

    heart_count = db.relationship('Heart', back_populates='gallery')

    def __repr__(self):
        return f'<Gallery {self.id}>'



### ------------------ HEART ------------------ ###

class Heart(db.Model, SerializerMixin):
    __tablename__ = 'hearts'

    serializer_rule = ('-users.heart_count', '-gallery.heart_count')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    gallery_id = db.Column(db.Integer, db.ForeignKey('gallery.id'), primary_key=True)

    users = db.relationship('User', back_populates='heart_count')
    gallery = db.relationship('Gallery', back_populates='heart_count')

    def __repr__(self):
        return f'<Heart user_id={self.user_id} gallery_id={self.gallery_id}>'



### ------------------ CONTACTUS ------------------ ###

class ContactUs(db.Model, SerializerMixin):
    __tablename__ = 'contacts'

    # serializer_rule = ('-users.contacts',)

    id = db.Column(db.Integer, primary_key=True, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    message = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User')

