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

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("An error occurred while connecting to MongoDB")
   

def get_all_embeddings_from_db():
    return list(collection.find({}, {'_id': 0}))  # Exclude MongoDB's default ID

def get_person(id):
    return list(collection.find({'id': id}, {'_id': 0})) 

# Function to save embeddings
def save_embedding_to_db(embedding, data):
    avg_embedding = np.mean(embedding, axis=0)
    embedding = avg_embedding.tolist()
  

    # Prepare the document to be inserted into the database
    document = {
        'id': data['id'],
        'embedding': embedding, # Save the embedding (list or array)
    }

    # Insert the document into the MongoDB collection
    collection.insert_one(document)
