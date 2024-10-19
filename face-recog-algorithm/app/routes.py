from flask import Flask, jsonify, request
from app.utils import delete_person_from_db, get_all_embeddings_from_db, get_person, save_embedding_to_db
import requests
import cv2
import numpy as np
from app.feature_extractor import feature_extractor
from app.find_best_embeddings import find_best_embedding
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins


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
    # print(persons)
    return jsonify({"persons": persons,
                    "Message": "Hello Manish"}), 200
   
   
@app.route('/report/saveembeddings', methods=['OPTIONS','POST'])
def report():
    if request.method == 'OPTIONS':
        return '',200
    # Extract unique_id from JSON request
    p_id = request.get_json().get('unique_id')
    print(p_id)
    
    # Fetch the person from the database
    person = get_person(p_id)
    
    # Handle case where the person is not found
    if not person:
        return jsonify({"message": 'Person not found'}), 404
    urls = []
    errors = []
    print(person)
    for url in person['images']['urls']:
        urls.append(url)
    print(urls)

    # Proceed only if there are URLs
    if not urls:
        return jsonify({"message": 'No image URLs found'}), 404

    embeddings = []
    
    for url in urls:
        print(f"Processing URL: {url}")
        response = requests.get(url)
        
        # Check for successful image download
        if response.status_code != 200:
            return jsonify({"message": f'Failed to download image from URL: {url}'}), 400
        
        # Convert the image content to a NumPy array
        file_bytes = np.asarray(bytearray(response.content), dtype=np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        # Check if the image was decoded successfully
        if image is None:
            return jsonify({"error": f"Failed to decode image from URL: {url}"}), 400
        
        # Resize image to reduce memory usage
        image = cv2.resize(image, (224, 224))
        embedding = feature_extractor(image)
        
        # Check if embedding was created successfully
        if embedding is None:
            errors.append(url)
        else:
            embeddings.append(embedding)  # Store the embedding for this image

    # Calculate average of all embeddings
    if embeddings:
        avg_embedding = np.mean(embeddings, axis=0)
        save_embedding_to_db(avg_embedding, p_id)
        return jsonify({"embeddings": avg_embedding.tolist()}), 200
    else:
        return jsonify({"message": 'No embeddings to save'}), 400
            

@app.route('/find/saveembeddings', methods=['POST'])
def search():
    p_id = request.get_json().get('unique_id')# Get image URL from request body
    
    person = get_person(p_id, 2) # fetch person from collection2
    
    if not person:
        return jsonify({"message": 'Person not found'}), 404
    urls = []
    errors = []
    for url in person['images']['urls']:
        urls.append(url)
    
    if not urls:
        return jsonify({"message": 'No image URLs found'}), 404

    embeddings = []
    for url in urls:
        print(f"Processing URL: {url}")
        response = requests.get(url)
        
        # Check for successful image download
        if response.status_code != 200:
            return jsonify({"message": f'Failed to download image from URL: {url}'}), 400
        
        # Convert the image content to a NumPy array
        file_bytes = np.asarray(bytearray(response.content), dtype=np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        # Check if the image was decoded successfully
        if image is None:
            return jsonify({"error": f"Failed to decode image from URL: {url}"}), 400
        
        # Resize image to reduce memory usage
        image = cv2.resize(image, (224, 224))
        embedding = feature_extractor(image)
        
        # Check if embedding was created successfully
        if embedding is None:
            errors.append(url)
        else:
            embeddings.append(embedding)  # Store the embedding for this image

    # Calculate average of all embeddings
    embeddings = np.mean(embeddings, axis=0)
    # best_match = find_best_embedding(embeddings)
    save_embedding_to_db(embeddings, p_id, 2)
    return jsonify({"message": "Image embeddings saved succesfully"}), 200
    

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    response = delete_person_from_db(id)
    if response == 0:
        return jsonify({"message": 'Person not found'}), 404
    
    return jsonify({"Person deleted succesfully"}), 200


def find_best(search_type=1):
    p_id = request.get_json().get('unique_id')
    person = get_person(p_id, search_type)
    if not person:
        return jsonify({"message": 'Person not found'}), 404
    embedding = person['images']['embeddings']
    if embedding is None:
        return jsonify({"message": 'No embeddings found'}), 404
    best_match, score = find_best_embedding(embedding, search_type)
    return jsonify({"best_match": best_match, "score": score}), 200

@app.route('/find/search', methods=['POST'])
def find_search():
    return find_best()

@app.route('/report/search', methods=['POST'])
def report_search():
    return find_best(2)