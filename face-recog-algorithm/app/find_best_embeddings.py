# Description: This file contains the function to find the best match for a query embedding in a dataset of embeddings.
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from app.utils import get_all_embeddings_from_db

def average_embedding(embeddings):
    return np.mean(embeddings, axis=0)

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def find_best_embedding(query_embedding, c_id=1, threshold=0.5):
    best_match = []
    min_distance = float('inf')
    score = []
    persons = get_all_embeddings_from_db(c_id)

    # Ensure query_embedding is a NumPy array
    if isinstance(query_embedding, list):
        query_embedding = np.array(query_embedding)
    
    for item in persons:
        embedding = item['images']['embeddings']
        if embedding is None:
            continue
        
        # Ensure embedding is a NumPy array
        if isinstance(embedding, list):
            embedding = np.array(embedding)
        
        # Calculate cosine similarity
        similarity = cosine_similarity(query_embedding.reshape(1, -1), embedding.reshape(1, -1))
        distance = 1 - similarity[0, 0]  # Convert similarity to distance
        
        # Check if the distance is below the threshold and if it's the best match so far
        if distance <= 70 and distance < threshold:
            # min_distance = distance
            best_match.append(item)
            score.append(distance)  # Similarity score between 0 and 1

    return best_match, score

