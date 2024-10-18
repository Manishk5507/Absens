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
db = client['face_recognition_db']
collection = db['embeddings']
collection2 = db['find']

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("An error occurred while connecting to MongoDB")
   

def get_all_embeddings_from_db():
    return list(collection.find({}, {'_id': 0}))  # Exclude MongoDB's default ID

def get_person(p_id):
    return list(collection.find({'id': p_id}, {'_id': 0})) 

# Function to save embeddings
def save_embedding_to_db(embedding, p_id=1):
    # save the embedding to the database with the person's ID
    result = collection.update_one(
        {"p_id": p_id},
        {"$set": {"embedding": embedding.tolist()}},
        upsert=True
    )
    
     # Check if the document was updated
    if result.matched_count == 0:
        return 0
    else:
        return 1
    
