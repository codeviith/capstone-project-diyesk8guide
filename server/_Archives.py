
### ------------------ QNA ------------------ ###


# @app.route('/qna', methods=['GET'])
# def get_qna():
#     # Fetch all Qna entries from the database
#     qna_entries = Qna.query.all()

#     # Convert Qna entries to a list of dictionaries
#     qna_data = [{'id': entry.id, 'post': entry.post, 'reply': entry.reply, 'timestamp': entry.timestamp} for entry in qna_entries]

#     # Return the Qna data as JSON
#     return jsonify(qna_data)



# @app.route('/qna/<int:post_id>/replies', methods=['GET'])
# def get_replies_for_post(post_id):
#     try:
#         # Find the post in the database
#         post = Qna.query.get(post_id)

#         if not post:
#             return jsonify({'error': 'Post not found'}), 404

#         # Get all replies for the post
#         replies = Reply.query.filter_by(qna_id=post_id).all()

#         # Convert replies to a list of dictionaries
#         replies_data = [{'id': reply.id, 'reply': reply.reply, 'timestamp': reply.timestamp} for reply in replies]

#         # Return the replies data as JSON
#         return jsonify(replies_data)

#     except Exception as e:
#         # Handle exceptions and return a JSON response
#         return jsonify({'error': str(e)}), 500



# @app.route('/qna', methods=['POST'])
# def add_qna():
#     if not is_authenticated():
#         return jsonify({'error': 'Not authenticated'}), 401

#     try:
#         # Get data from the request
#         data = request.get_json()

#         # Extract post and reply from the request data
#         post = data.get('post', '')
#         reply = data.get('reply', '')

#         # Check if both post and reply are provided
#         if not post and not reply:
#             return jsonify({'error': 'Both post and reply are required'}), 400

#         # Create a new Qna entry
#         new_qna = Qna(post=post, reply=reply, timestamp=datetime.utcnow())

#         # Add the new Qna entry to the database
#         db.session.add(new_qna)
#         db.session.commit()

#         # Return the newly created Qna entry as JSON
#         return jsonify({'id': new_qna.id, 'post': new_qna.post, 'reply': new_qna.reply, 'timestamp': new_qna.timestamp}), 201

#     except Exception as e:
#         # Handle exceptions and return a JSON response
#         return jsonify({'error': str(e)}), 500


# @app.route('/qna/<int:post_id>/reply', methods=['POST'])
# def add_reply(post_id):
#     if not is_authenticated():
#         return jsonify({'error': 'Not authenticated'}), 401

#     try:
#         # Get data from the request
#         data = request.get_json()

#         # Extract reply from the request data
#         reply_text = data.get('reply', '')

#         # Check if reply is provided
#         if not reply_text:
#             return jsonify({'error': 'Reply is required'}), 400

#         # Find the post in the database
#         post = Qna.query.get(post_id)

#         if not post:
#             return jsonify({'error': 'Post not found'}), 404

#         # Create a new Reply entry
#         new_reply = Reply(reply=reply_text, timestamp=datetime.utcnow(), qna=post)

#         # Add the new Reply entry to the database
#         db.session.add(new_reply)
#         db.session.commit()

#         # Return the newly created Reply entry as JSON
#         return jsonify({'id': new_reply.id, 'reply': new_reply.reply, 'timestamp': new_reply.timestamp}), 201

#     except Exception as e:
#         # Handle exceptions and return a JSON response
#         return jsonify({'error': str(e)}), 500


# @app.route('/qna/<int:post_id>', methods=['DELETE'])
# def delete_post(post_id):
#     try:
#         post = Qna.query.get(post_id)
#         if not post:
#             return jsonify({'error': 'Post not found'}), 404

#         db.session.delete(post)
#         db.session.commit()

#         return jsonify({'message': 'Post deleted successfully'}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500











### ------------------ QNA ------------------ ###

# class Qna(db.Model, SerializerMixin):
#     __tablename__ = 'qna'


#     serializer_rule = ('-users.qna',)

#     id = db.Column(db.Integer, primary_key=True, unique=True)
#     post = db.Column(db.String, nullable=False)
#     reply = db.Column(db.String, nullable=False)
#     timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

#     users = db.relationship('User', back_populates='qna')
#     replies = db.relationship('Reply', back_populates='qna', cascade='all, delete-orphan')


#     def __repr__(self):
#         return f'<Qna {self.id}>'

### ------------------ REPLY ------------------ ###

# class Reply(db.Model):
#     __tablename__ = 'replies'

#     id = db.Column(db.Integer, primary_key=True, unique=True)
#     reply = db.Column(db.String, nullable=False)
#     timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
#     qna_id = db.Column(db.Integer, db.ForeignKey('qna.id'))
    
#     qna = db.relationship('Qna', back_populates='replies')
