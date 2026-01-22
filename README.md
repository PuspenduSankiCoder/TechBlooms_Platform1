# TechBlooms - Global Research Platform

A full-stack web application for managing research internships, projects, and applications. Built with React.js (frontend) and Node.js/Express.js with MongoDB (backend).

## Features

### Frontend
- ✅ Modern React.js application with functional components and hooks
- ✅ Registration and Sign In pages with form validation
- ✅ JWT-based authentication with protected routes
- ✅ Apply Now functionality connected to backend API
- ✅ Dark mode theme toggle
- ✅ Responsive design for mobile and desktop
- ✅ Carousel/Slider with featured success stories
- ✅ Project filtering and internship program tabs
- ✅ Contact form and newsletter subscription

### Backend
- ✅ RESTful API with Node.js and Express.js
- ✅ MVC folder structure (Models, Views, Controllers)
- ✅ MongoDB database with Mongoose ODM
- ✅ JWT authentication with bcrypt password hashing
- ✅ Protected routes with authentication middleware
- ✅ CORS and body-parser middleware
- ✅ Environment variables for configuration
- ✅ Error handling middleware

## Project Structure

```
Techblooms/
├── frontend/                 # React.js Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── Carousel.js
│   │   │   ├── Features.js
│   │   │   ├── Projects.js
│   │   │   ├── Internships.js
│   │   │   ├── Faculty.js
│   │   │   ├── Workshops.js
│   │   │   ├── Contact.js
│   │   │   ├── Footer.js
│   │   │   ├── ThemeToggle.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   └── Profile.js
│   │   ├── context/         # React Context
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
│
├── backend/                  # Node.js/Express Backend
│   ├── models/              # MongoDB Schemas
│   │   ├── User.js
│   │   └── Application.js
│   ├── controllers/         # Business Logic
│   │   ├── AuthController.js
│   │   ├── ApplicationController.js
│   │   └── UserController.js
│   ├── routes/              # API Routes
│   │   ├── authRoutes.js
│   │   ├── applicationRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/          # Custom Middleware
│   │   └── AuthMiddleware.js
│   ├── server.js            # Entry point
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## Installation & Setup

### 1. Clone or Navigate to Project Directory

```bash
cd d:\Techblooms\TB
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# On Windows PowerShell:
Copy-Item .env.example .env

# On Linux/Mac:
# cp .env.example .env

# Edit .env file with your configuration:
# PORT=5000
# NODE_ENV=development
# MONGODB_URI=mongodb://localhost:27017/techblooms
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# JWT_EXPIRE=7d
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install

# Create .env file for frontend
# On Windows PowerShell:
New-Item .env -ItemType File
Add-Content .env "REACT_APP_API_URL=http://localhost:5000/api"

# On Linux/Mac:
# echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or start manually:
net start MongoDB
```

**Linux/Mac:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# or
mongod
```

## Running the Application

### Start Backend Server

```bash
# From backend directory
cd backend

# Development mode (with nodemon for auto-restart)
npm run dev

# Or production mode
npm start

# Server will run on http://localhost:5000
```

### Start Frontend Development Server

```bash
# From frontend directory (in a new terminal)
cd frontend

npm start

# Frontend will run on http://localhost:3000
# It will automatically open in your browser
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |

### Application Routes (Protected)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/apply` | Submit an application | Private |
| GET | `/api/apply` | Get user's applications | Private |

### User Routes (Protected)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/user/profile` | Get user profile | Private |
| PUT | `/api/user/profile` | Update user profile | Private |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API status |

## Database Schemas

### User Schema

```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, lowercase),
  password: String (required, min 6 chars, hashed with bcrypt),
  role: String (enum: 'student', 'researcher', 'faculty', 'admin', default: 'student'),
  createdAt: Date (default: Date.now)
}
```

### Application Schema

```javascript
{
  userId: ObjectId (required, ref: 'User'),
  appliedFor: String (required),
  status: String (enum: 'pending', 'under-review', 'accepted', 'rejected', default: 'pending'),
  date: Date (default: Date.now),
  additionalInfo: String (optional)
}
```

## Sample Test Data

### Register a User

**POST** `http://localhost:5000/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2024-01-10T..."
  }
}
```

### Login

**POST** `http://localhost:5000/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Submit Application (Protected - Requires JWT Token)

**POST** `http://localhost:5000/api/apply`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Body:**
```json
{
  "appliedFor": "2-Month Intensive Research Program",
  "additionalInfo": "I'm interested in AI research"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "_id": "...",
    "userId": "...",
    "appliedFor": "2-Month Intensive Research Program",
    "status": "pending",
    "date": "2024-01-10T...",
    "additionalInfo": "I'm interested in AI research"
  }
}
```

### Get User Profile (Protected)

**GET** `http://localhost:5000/api/user/profile`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2024-01-10T...",
    "applications": [...]
  }
}
```

## Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/techblooms
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Important:** 
- Never commit `.env` files to version control
- Change `JWT_SECRET` to a strong, random string in production
- Update `REACT_APP_API_URL` for production deployment

## Authentication Flow

1. User registers or logs in through frontend forms
2. Backend validates credentials and returns JWT token
3. Frontend stores JWT token in `localStorage`
4. Axios automatically includes token in Authorization header for protected routes
5. Backend middleware verifies token on protected routes
6. If token is valid, request proceeds; otherwise, 401 Unauthorized is returned

## Error Handling

The application includes comprehensive error handling:

- **Frontend**: Form validation, API error messages, loading states
- **Backend**: Try-catch blocks, error middleware, appropriate HTTP status codes

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB service is running
- Check `MONGODB_URI` in `.env` file
- Verify MongoDB is accessible on default port 27017

### CORS Errors

- Backend already includes CORS middleware
- Check if frontend `REACT_APP_API_URL` matches backend URL

### Authentication Issues

- Verify JWT_SECRET is set in backend `.env`
- Check token expiration time
- Ensure token is being sent in Authorization header

### Port Already in Use

- Change `PORT` in backend `.env` if 5000 is in use
- Update frontend `REACT_APP_API_URL` accordingly

## Development Tips

- Use `npm run dev` in backend for auto-restart on file changes (requires nodemon)
- React development server (frontend) auto-reloads on changes
- Check browser console and terminal for error messages
- Use MongoDB Compass or similar tool to view database data

## Production Deployment

### Backend
- Set `NODE_ENV=production`
- Use a secure `JWT_SECRET`
- Configure proper MongoDB connection (e.g., MongoDB Atlas)
- Use environment variables for all sensitive data

### Frontend
- Run `npm run build` to create production build
- Update `REACT_APP_API_URL` to production API URL
- Serve build folder with a web server (nginx, Apache, etc.)

## Technologies Used

### Frontend
- React.js 18.2.0
- React Router DOM 6.20.0
- Axios 1.6.2
- Font Awesome 6.4.0
- Google Fonts (Poppins, Montserrat)

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose 8.0.3
- JWT (jsonwebtoken) 9.0.2
- bcryptjs 2.4.3
- CORS 2.8.5
- dotenv 16.3.1

## License

This project is created for educational purposes.

## Support

For issues or questions, please check the error messages in:
- Browser console (frontend)
- Terminal/console (backend)
- MongoDB logs

---

**Happy Coding! 🚀**

