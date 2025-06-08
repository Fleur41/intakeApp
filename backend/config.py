import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-123'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BASIC_AUTH_USERNAME = os.environ.get('ADMIN_USER') or 'postgres'
    BASIC_AUTH_PASSWORD = os.environ.get('ADMIN_PASS') or 'postgres'

    CORS_HEADERS = 'Content-Type'
    CORS_RESOURCES = {r"/api/*": {"origins": "*"}}