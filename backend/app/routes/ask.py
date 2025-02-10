import os
import asyncio
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify

from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings

from models.agents import RagSqlAgent

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
def ask_question():
    if request.method == 'OPTIONS':
        # Preflight response
        response = jsonify({})
        response.headers.add("Access-Control-Allow-Origin",
                             "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response
    else:
        data = request.get_json()
        question = data.get('question', '')
        user = data.get('user')

        if not question:
            return jsonify({"error": "No question provided"}), 400

        if not user:
            return jsonify({"error": "No user provided"}), 400

        response = asyncio.run(qa_agent.ask(user, question))

        return jsonify({"response": response})
