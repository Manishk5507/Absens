# Description: This file contains the function to find the best match for a query embedding in a dataset of embeddings.
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from app.utils import get_all_embeddings_from_db

def average_embedding(embeddings):
    return np.mean(embeddings, axis=0)

def find_best_embedding(query_embedding, threshold=0.5):
    best_match = None
    min_distance = float('inf')
    score = 0
    persons = get_all_embeddings_from_db()

    for item in persons:
        embedding = item['embedding']
        
        # Calculate cosine similarity
        if isinstance(embedding, list):
            embedding = np.array(embedding)
        similarity = cosine_similarity(query_embedding.reshape(1, -1), embedding.reshape(1, -1))
        distance = 1 - similarity[0, 0]  # Convert similarity to distance
        
        # Check if the distance is below the threshold and if it's the best match so far
        if distance < min_distance and distance < threshold:
            min_distance = distance
            best_match = item
            score = 1 - distance  # Similarity score between 0 and 1

    return best_match, score 
 # Return the best match or None if no match found
