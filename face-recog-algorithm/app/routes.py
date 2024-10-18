from flask import Flask, jsonify
from app.utils import get_all_embeddings_from_db

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    persons = get_all_embeddings_from_db()
    return jsonify({"users":persons})
   
