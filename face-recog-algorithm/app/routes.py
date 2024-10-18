from flask import Flask, jsonify, request
from app.utils import get_all_embeddings_from_db, get_person, save_embedding_to_db
import requests
import cv2
import numpy as np
from app.feature_extractor import feature_extractor
from app.find_best_embeddings import find_best_embedding


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
   
   
@app.route('/report', methods=['POST'])
def report():
    # person = get_person(id)
    person = [request.form.get('url1'), request.form.get('url2')]
    if not person:
        return jsonify({"message": 'Person not found'}), 404
    
    images = person
    embeddings = []
    for url in images:
        response = requests.get(url)
        if response.status_code != 200:
            return jsonify({"message": 'Failed to download image from URL'}), 400
        
        # Convert the image content to a NumPy array
        file_bytes = np.asarray(bytearray(response.content), dtype=np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        if image is None:
                return jsonify({"error": "Failed to decode image"}), 400
        
        image = cv2.resize(image, (224, 224))  # Resize image to reduce memory usage
        embedding = feature_extractor(image)   
        if embedding is None:
                return jsonify ({"message": 'No face detected in the image: {url}'})
        else:
            embeddings.append(embedding) # Store the embedding for this image
            
            
    # make average of all embeddings
    avg_embedding = np.mean(embeddings, axis=0)
    # Save image embeddings to the database
    response = save_embedding_to_db(avg_embedding, p_id=1)
    if response == 0:
        return jsonify({"message": 'Failed to save embedding to the database'}), 500
    return jsonify({"message": 'Embedding saved successfully'}), 200
            

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
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        
        if image is None:
            return jsonify({"error": "Failed to decode image"}), 400
        
        # Resize image to reduce memory usage
        image = cv2.resize(image, (224, 224)) 
        
        # Extract embeddings
        embeddings = feature_extractor(image)
        
        if embeddings is None:
            return jsonify({"message": 'No face detected in the image from URL'}), 200
        
        # Find the best match for the extracted embeddings
        best_match, score = find_best_embedding(embeddings)
        
        return jsonify({'message': 'Person found successfully',
                        "person": best_match,
                        "score": score}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500