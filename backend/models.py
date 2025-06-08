from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class IntakeSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    spouse_name = db.Column(db.String(100))
    county = db.Column(db.String(50), nullable=False)
    has_children = db.Column(db.Boolean, default=False)
    email = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)  # or even larger