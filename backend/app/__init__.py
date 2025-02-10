import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from .routes.ask import ask_bp

load_dotenv()

ui_url = os.getenv("UI_URL", "http://localhost:3000")


def create_app():
    app = Flask(__name__)
    CORS(app, origins=[ui_url], supports_credentials=True)
    app.config.from_object('config.Config')

    # Register Blueprints
    app.register_blueprint(ask_bp)

    return app
