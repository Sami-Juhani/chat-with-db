"""
Flask application module for the chat-with-db backend.

This module initializes the Flask application, sets up CORS, JWT authentication,
and registers the necessary blueprints for the API routes.
"""

import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from .routes.ask import ask_bp
from .routes.auth import auth_bp

load_dotenv()

# Get the URL of your frontend, in development it will be http://localhost:3000
ui_url = os.getenv("UI_URL", "http://localhost:3000")


def create_app():
    """
    Create the Flask application
    """
    app = Flask(__name__)
    CORS(app,
         origins=[ui_url],
         supports_credentials=True,
         expose_headers=["Authorization"],
         allow_headers=["Content-Type", "Authorization"])
    app.config.from_object('config.Config')

    # Setup JWT
    app.config["JWT_SECRET_KEY"] = os.getenv(
        "JWT_SECRET_KEY")
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    JWTManager(app)

    # Register Blueprints
    app.register_blueprint(ask_bp)
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app
