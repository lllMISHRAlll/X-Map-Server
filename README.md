# 🌐 X Maps – Backend Server

Node.js Express server with MongoDB for X Maps application, handling authentication, search history, and secure API endpoints.

![Database Schema]() _(Add schema screenshot here)_

## ✨ Key Features

### 🔐 Authentication System

- JWT-based authentication
- Google OAuth 2.0 integration
- Password reset via email
- Session management
- Password encryption with bcrypt

### 📍 Location Services

- Store/retrieve search history with geocoordinates
- MongoDB geospatial queries
- Protected API endpoints

### 📦 Core Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.5",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.14.3",
  "nodemailer": "^7.0.3",
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "winston": "^3.17.0"
}
```

🚀 Tech Stack
| **Category** | **Technologies Used** |
| ------------ | --------------------------- |
| Runtime | Node.js (ES Modules) |
| Framework | Express.js 5.x |
| Database | MongoDB + Mongoose ODM |
| Auth | JWT, Passport, Google OAuth |
| Security | bcrypt, CORS, Helmet |
| Logging | Winston |
| Email | Nodemailer |

📂 Project Structure

```
backend/
├── config/
│   ├── db.js          # MongoDB connection
│   └── passport.js    # OAuth strategies
├── controllers/
│   ├── auth.js        # Auth logic
│   ├── search.js      # Search history
│   └── email.js       # Email services
├── middleware/
│   ├── auth.js        # JWT verification
│   ├── error.js       # Error handling
│   └── logger.js      # Winston config
├── models/
│   ├── User.js        # User schema
│   └── Search.js      # Search history schema
├── routes/
│   ├── auth.js        # Auth routes
│   ├── search.js      # Search routes
│   └── oauth.js       # Google OAuth routes
├── .env               # Environment config
├── app.js             # Express setup
└── server.js          # Server entry

```

⚙️ Configuration
Create a .env file in the root directory:

env

```

PORT=5000
MONGO_URI=mongodb://localhost:27017/xmaps
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173
PASSPORT_GOOGLE_CLIENT_ID=your_google_client_id
PASSPORT_GOOGLE_CLIENT_SECRET=your_google_secret
SMTP_USER=your_nodemailer_email
SMTP_PASS=your_email_password
SESSION_SECRET=your_session_secret
SERVER_URL = http://localhost:5000

```

🧰 Installation
bash

```
npm install
npm install -g nodemon # Optional for development

```

🚀 Running the Server
Development (with hot reload)
bash

```
npm run dev
Production
```

bash

```
npm start
```

🔌 API Endpoints

| **Endpoint**                | **Method** | **Description**             |
| --------------------------- | ---------- | --------------------------- |
| `/api/auth/register`        | POST       | Email/password registration |
| `/api/auth/login`           | POST       | Email/password login        |
| `/api/auth/google`          | GET        | Initiate Google OAuth flow  |
| `/api/auth/forgot-password` | POST       | Request password reset      |
| `/api/auth/reset-password`  | POST       | Submit new password         |

📍 location History (Protected)
| **Endpoint** | **Method** | **Protected** | **Description** |
| ----------------- | ---------- | ------------- | ----------------------------- |
| `/api/location/save` | POST | Yes | Save new location |
| `/api/location/get` | GET | Yes | Get user's location history |
| `/api/location/delete/:id` | DELETE | Yes | Delete specific location record |

🛠️ Development Tools
Nodemon – Hot reloading during development

Winston – Structured logging

Postman – API testing

MongoDB Compass – Database visualization
