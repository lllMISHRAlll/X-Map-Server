🌐 X Maps – Backend

This is the backend server for X Maps, a full-stack web application that allows users to search for addresses, view them on an interactive map, and store their search history. The server handles authentication, search data management, and secure API routing.

🚀 Features

🔐 User registration and login (JWT-based authentication)

📍 Save and retrieve previously searched addresses with coordinates

🔒 Password encryption with bcrypt

✅ Secure, protected API routes

🧱 Modular code structure

🛠️ Tech Stack

Node.js with Express.js

MongoDB with Mongoose

JWT for authentication

bcrypt for hashing passwords

dotenv for environment variables

📁 Folder Structure

bash
Copy
Edit
backend/
├── config/ # MongoDB connection
├── controllers/ # Route logic for auth & search
├── middleware/ # Auth & error middleware
├── models/ # Mongoose schemas
├── routes/ # API endpoints
├── .env # Environment variables
├── app.js # Main Express config
├── server.js # Server entry point
└── package.json
⚙️ Environment Variables

Create a .env file in the root and add:
env

PORT=5000
MONGO_URI=mongodb://localhost:27017/xmaps
JWT_SECRET=your_jwt_secret_key
If you're using MongoDB Atlas, replace MONGO_URI with your connection string.

🧪 API Endpoints
🔑 Auth
POST /api/auth/register – Register a new user

POST /api/auth/login – Log in and receive a JWT

📍 Search History (Protected)
POST /api/search – Save an address + coordinates

GET /api/search – Retrieve all past searches for the user

🧰 Installation & Running Locally
Clone the repository:

bash

git clone https://github.com/lllMISHRAlll/X-Map-Server.git
cd xmaps-server
Install dependencies:

bash

npm install
Create .env file and add your variables.

Run the server in development:

bash

npm run dev
Or in production:

bash

npm start
✅ Recommended Tools
MongoDB Compass for visual DB management

Postman or Thunder Client for API testing
