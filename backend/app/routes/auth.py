"""
Authentication related routes and functionality.
This module handles user authentication, including login endpoints
and protected route access using JWT tokens.
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash
from ..models.db import get_user_by_email, get_user_with_orders

auth_bp = Blueprint('auth_bp', __name__)


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Handle login request.

    Args:
        email (str): The user's email
        password (str): The user's password

    Returns:
        jsonify: A JSON response with the access token
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = get_user_by_email(email)

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid email or password"}), 401

    # Create token with user information - store only user_id as identity
    access_token = create_access_token(
        identity=str(user.user_id))  # Convert to string

    return jsonify(access_token=access_token)


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_data():
    """Get current user data including orders"""
    user_id = int(get_jwt_identity())

    user_data = get_user_with_orders(user_id)

    if not user_data:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(user_data)
