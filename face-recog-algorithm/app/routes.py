from flask import Flask, jsonify, request
from app.utils import get_all_embeddings_from_db, get_person
import requests
import cv2
import numpy as np


app = Flask(__name__)

# Set upload folder and allowed file types
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# Function to check allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET'])
def home():
    persons = get_all_embeddings_from_db()
    return jsonify({"users":persons})
   
   
@app.route('/search', methods=['POST'])
def search():
    url = request.json.get('url')# Get image URL from request body
    
    if not url:
        return jsonify({"message": 'No image URL provided'}), 400
    
    try:
        # Fetch the image from the URL
        response = requests.get(url)
        if response.status_code != 200:
            return jsonify({"message": 'Failed to download image from URL'}), 400
        
        # Convert the image content to a NumPy array
        file_bytes = np.asarray(bytearray(response.content), dtype=np.uint8)
        if not file_bytes.size:
            return jsonify({"message": 'Invalid image'}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500