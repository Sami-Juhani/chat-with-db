from flask import Flask
from flask_cors import CORS

from .routes.ask import ask_bp


def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
    app.config.from_object('config.Config')

    # Register Blueprints
    app.register_blueprint(ask_bp)

    return app
    
