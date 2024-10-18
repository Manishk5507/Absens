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
