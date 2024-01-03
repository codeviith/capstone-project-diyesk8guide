from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from sqlalchemy import DateTime, desc
from sqlalchemy.orm import validates

from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

bcrypt = Bcrypt()


### ------------------ USER ------------------ ###


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serializer_rule = ('-boards.users', '-gurus.users', '-qna.users')

    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    rider_stance = db.Column(db.String, nullable=False)
    boards_owned = db.Column(db.String)


    boards = db.relationship('Board', back_populates='users')
    gurus = db.relationship('Guru', back_populates='users')
    qna = db.relationship('Qna', back_populates='users')
    hearted_gallery_items = db.relationship('Gallery', secondary='hearts', back_populates='hearted_by_users')



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


    def __repr__(self):
        return f'<Guru {self.id}>'



### ------------------ CONTACTUS ------------------ ###

class ContactUs(db.Model, SerializerMixin):
    __tablename__ = 'contacts'

    # serializer_rule = ('-users.contacts',)

    id = db.Column(db.Integer, primary_key=True, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    message = db.Column(db.Text, nullable=False)

    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # users = db.relationship('User', back_populates='contacts')




### ------------------ QNA ------------------ ###

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


    def __repr__(self):
        return f'<Qna {self.id}>'


class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    reply = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    qna_id = db.Column(db.Integer, db.ForeignKey('qna.id'))
    
    qna = db.relationship('Qna', back_populates='replies')



### ------------------ GALLERY ------------------ ###


hearts = db.Table('hearts',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('gallery_id', db.Integer, db.ForeignKey('gallery.id'), primary_key=True)
)

class Gallery(db.Model, SerializerMixin):
    __tablename__ = 'gallery'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    image_filename = db.Column(db.String, nullable=False)
    battery_type = db.Column(db.String, nullable=False)
    motor_type = db.Column(db.String, nullable=False)
    wheel_type = db.Column(db.String, nullable=False)
    truck_type = db.Column(db.String, nullable=False)
    max_speed = db.Column(db.String, nullable=False)

    hearts = db.Column(db.Integer, default=0)

    def __init__(self, image_filename, battery_type, motor_type, wheel_type, truck_type, max_speed):
        self.image_filename = image_filename
        self.battery_type = battery_type
        self.motor_type = motor_type
        self.wheel_type = wheel_type
        self.truck_type = truck_type
        self.max_speed = max_speed

    def to_dict(self):
        return {
            'id': self.id,
            'image_filename': self.image_filename,
            'battery_type': self.battery_type,
            'motor_type': self.motor_type,
            'wheel_type': self.wheel_type,
            'truck_type': self.truck_type,
            'max_speed': self.max_speed
        }
    
    hearted_by_users = db.relationship('User', secondary='hearts', back_populates='hearted_gallery_items')


    def __repr__(self):
        return f'<Reply {self.id}>'


