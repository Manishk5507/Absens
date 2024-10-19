
# ABSENS

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Project Overview
Absens is a web-based application designed to assist in locating missing individuals. This system allows users to report missing persons by uploading images, extracting embeddings from these images, and storing the data in a database. When someone files a missing or found query, the system uses facial recognition technology to match the uploaded images with those in the database, providing relevant details to the user.

## Features
- **Image Upload**: Users can upload at least 2 images of a missing person.
- **Facial Recognition**: The system extracts facial embeddings to identify matches in the database.
- **Reporting System**: Users can report missing or found individuals with relevant details.
- **Database Integration**: MongoDB is used for storing images and embeddings.
- **Chatbot Support**: Integrated chatbot to assist users in reporting and searching for missing individuals.

## Technology Stack
- **Frontend**: React(Vite), JavaScript
- **Backend**: Flask, Node js
- **Database**: MongoDB
- **Machine Learning**: TensorFlow / Keras (for facial recognition and embedding extraction)/ FaceNet
- **Chatbot**: Dialogflow

## Installation
1. Clone the repository:
   ```bash
   https://github.com/Manishk5507/Absens.git
   cd Absens
   ```
2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scriptsctivate`
   ```
3. Install the required packages:
   1. for front-end:
      - move to front end using ``` cd Frontend ```
      - install node modules ``` npm i ```
      - start front end ``` npm run dev ```
   2. for backennd:
      - move to backend folder using ``` cd Backend ```
      - install dependencies ``` npm install ```
      - start backend ``` node app.js ```
   3. for facial recognition ml api
      - move to facial-recog-algorithm ``` cd facial-recog-algorithm ```
      - install requirements ``` pip install -r requirements.txt ```
      - start flask server ``` python main.py ```
 
5. Set up guide:
   1. Set up enviroment variables by creating .env file in Frontend, Backend and facial-recog-algorithm
      - In Frontend
        ```bash
        VITE_BACKEND_URL= URL on which backend is running
        VITE_FACE_RECOGNITION=URL of server on which flask server is running
        ```
      - In Backend
        ```bash
        MONGO_URI= Your mongoDb uri
        PORT=50S00
        SECRET=any random secret key
        FRONTEND_URL=url on which frontend is running
        CLOUD_NAME=cloudinary account name
        CLOUD_API_KEY=cloudinary api key
        CLOUD_API_SECRET=cloudinary api secret
        ```
      - In facial-recog-algorithm
        ```bash
        MONGO_URI= Your mongoDb uri
        ```
        
## Usage
## API Endpoints:
1. Base url ```/```
   - To get all the users present in the database
2. Report ```/report/saveembeddings```
   - To report a missing child by uploading images(>=2) along with other information about the person.
3. Find Query ```/find/saveembeddings ```
   - To handle the find query if the person is already present in DB or not.
4. Search in find_embeddings database ```/find/search```
   - A unique_id is sent through POST request 
   - To search if similar person is present in find_embeddings data base
5. Search in report_embeddings database ```/report/search```
   - A unique_id is sent through POST request.
   - To search if similar person is present in report_embeddings database

## Contributing
We welcome contributions! If you have suggestions for improvements or would like to report issues, please feel free to fork the repository and submit a pull request. Feel free to reach out if you have any questions or suggestions!

## Acknowledgments
- Thank you to all the contributors who helped bring Absens to life!
- Special thanks to the maintainers of the libraries and technologies used in this project.
