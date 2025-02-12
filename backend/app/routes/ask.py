"""
Routes for handling chat-based database queries using LangChain and OpenAI.
This module provides endpoints for asking questions about the database using natural language,
which are then processed by a RAG-enabled SQL agent to provide accurate responses.
"""

import os
import asyncio
import getpass
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import OperationalError

from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings

from ..services.agents import RagSqlAgent
from ..models.db import get_user_with_orders

load_dotenv()

if not os.environ.get("OPENAI_API_KEY"):
    os.environ["OPENAI_API_KEY"] = getpass.getpass(
        "Enter API key for OpenAI: ")
if not os.environ.get("DB_URI"):
    os.environ["DB_URI"] = getpass.getpass(
        "Enter connection string for PostgreSQL: ")

model = os.getenv("GPT_DEPLOYMENT_MODEL", "gpt-4o-mini")
openai_api_key = os.environ["OPENAI_API_KEY"]
db_uri = os.environ["DB_URI"]

llm = ChatOpenAI(
    model=model,
    openai_api_key=openai_api_key,
    temperature=0.0)

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")

qa_agent = RagSqlAgent(llm=llm, sql_db_uri=db_uri, vector_db_uri=db_uri,
                       embeddings=embeddings, collection_name="trendwear", agent_type="openai-tools")

ask_bp = Blueprint('ask_bp', __name__)


@ask_bp.route('/ask', methods=['POST'])
@jwt_required()  # This ensures the endpoint requires a valid JWT token
def ask_question():
    """
    Handle ask request.

    Args:
        question (str): The question to ask

    Returns:
        jsonify: A JSON response with the ask result
    """
    if request.method == 'OPTIONS':
        # Preflight response
        response = jsonify({})
        response.headers.add("Access-Control-Allow-Origin",
                             "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers",
                             "Content-Type,Authorization")  # Added Authorization
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response
    else:
        data = request.get_json()
        question = data.get('question', '')

        user_id = int(get_jwt_identity())

        try:
            user_data = get_user_with_orders(user_id)

            if not user_data:
                return jsonify({"error": "User not found"}), 404

            response = asyncio.run(qa_agent.ask(user_data, question))
            return jsonify({"response": response})

        except OperationalError as e:
            # Handle database connection errors
            print(f"Database connection error: {str(e)}")
            return jsonify({"error": "Database connection error. Please try again."}), 503
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            return jsonify({"error": "An unexpected error occurred"}), 500
