from dotenv import load_dotenv
load_dotenv()

import os
from flask import Flask, request, jsonify
from flask_basicauth import BasicAuth
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, IntakeSubmission, Admin
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app)
    with app.app_context():
        db.create_all()
    return app

app = create_app()
basic_auth = BasicAuth(app)

@app.route('/api/submit', methods=['POST'])
def submit_intake():
    data = request.get_json()
    required_fields = ['fullName', 'county', 'hasChildren', 'email']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Robust boolean conversion for hasChildren
    has_children = data['hasChildren']
    if isinstance(has_children, str):
        has_children = has_children.lower() == 'true'
    else:
        has_children = bool(has_children)

    submission = IntakeSubmission(
        full_name=data['fullName'],
        spouse_name=data.get('spouseName'),
        county=data['county'],
        has_children=has_children,
        email=data['email']
    )
    db.session.add(submission)
    db.session.commit()
    return jsonify({"message": "Thanks, we'll be in touch"}), 201

@app.route('/api/submissions', methods=['GET'])
@basic_auth.required
def get_submissions():
    county = request.args.get('county')
    has_children = request.args.get('hasChildren')

    query = IntakeSubmission.query
    if county:
        query = query.filter_by(county=county)
    if has_children is not None:
        # Accepts 'true', 'false', True, False
        if isinstance(has_children, str):
            has_children_bool = has_children.lower() == 'true'
        else:
            has_children_bool = bool(has_children)
        query = query.filter_by(has_children=has_children_bool)

    submissions = query.order_by(IntakeSubmission.created_at.desc()).all()
    return jsonify([{
        'id': s.id,
        'fullName': s.full_name,
        'spouseName': s.spouse_name,
        'county': s.county,
        'hasChildren': s.has_children,
        'email': s.email,
        'createdAt': s.created_at.isoformat()
    } for s in submissions])

@app.route('/api/admin/signup', methods=['POST'])
def admin_signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    if Admin.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 409
    hashed_password = generate_password_hash(password)
    admin = Admin(username=username, password_hash=hashed_password)
    db.session.add(admin)
    db.session.commit()
    return jsonify({'message': 'Admin account created'}), 201

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    admin = Admin.query.filter_by(username=username).first()
    if not admin or not check_password_hash(admin.password_hash, password):
        return jsonify({'error': 'Invalid username or password'}), 401
    return jsonify({'message': 'Login successful'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)