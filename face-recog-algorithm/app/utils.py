from json import dumps
from bson import ObjectId
from flask import jsonify
import numpy as np
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv('MONGODB_URI')
print("Mongo uri: ", uri)
# print(uri)
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['FindrDB']
collection = db['reportmissings']
collection2 = db['findmissings']

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("An error occurred while connecting to MongoDB")
   

def serialize_doc(doc):
    """Convert MongoDB document to a serializable format."""
    # Convert ObjectId fields to strings
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            doc[key] = str(value)
        elif isinstance(value, dict):
            doc[key] = serialize_doc(value)  # Recursively serialize dicts
        elif isinstance(value, list):
            # Recursively serialize items in the list if they are dicts
            doc[key] = [serialize_doc(item) if isinstance(item, dict) else item for item in value]
    return doc

def get_all_embeddings_from_db(collection_id=1):
    cln = collection
    if(collection_id == 2):
        cln = collection2
    cursor = cln.find({})
    return [serialize_doc(doc) for doc in cursor]  # Serialize each document


def get_person(p_id, collection_id=1):
    cln = collection
    if(collection_id == 2):
        cln = collection2
    person = cln.find_one({'unique_id': p_id})  # Fetch a single person document
    if person:
        return person  # Serialize and return the document as JSON
    else:
        return jsonify({"message": "Person not found"}), 404  # Return a 404 error if not found

# Function to save embeddings
def save_embedding_to_db(embedding, unique_id, collection_id=1):
    """
    Save the embedding to the database associated with the person's unique ID.
    
    Args:
        embedding (numpy array): The embedding to be saved.
        unique_id (str): The unique ID of the person.

    Returns:
        int: 1 if the embedding was saved successfully, 0 if there was an error.
    """
    cln = collection
    if(collection_id == 2):
        cln = collection2
    try:
        # Update the document with the provided unique_id
        result = cln.update_one(
            {"unique_id": unique_id},  # Search by unique_id
            {"$set": {"images.embeddings": embedding.tolist()}},  # Save the embedding as a list
            upsert=True  # Create a new document if no match is found
        )
        
        # Check if the document was inserted or updated
        if result.modified_count > 0 or result.upserted_id is not None:
            return 1  # Success
        else:
            return 0  # No changes were made
    except Exception as e:
        print(f"Error saving embedding: {e}")  # Print the error for debugging
        return 0  # Indicate failure

    
    
def delete_person_from_db(id):
    try:
        collection.delete_one({'id': id})
        return 1
    except Exception as e:
        return 0