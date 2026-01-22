# Quick Start Guide

## Prerequisites Check
- ✅ Node.js installed (v14+)
- ✅ MongoDB installed and running
- ✅ npm or yarn installed

## Step 1: Backend Setup (Terminal 1)

```bash
cd backend
npm install

# Create .env file (copy from env.example.txt)
# Windows PowerShell:
Copy-Item env.example.txt .env

# Edit .env and set:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/techblooms
# JWT_SECRET=your_secret_key_here
# JWT_EXPIRE=7d

# Start MongoDB (if not running)
# Windows: net start MongoDB
# Linux/Mac: sudo systemctl start mongod

# Start backend server
npm run dev
# or
npm start
```

Backend should be running on `http://localhost:5000`

## Step 2: Frontend Setup (Terminal 2)

```bash
cd frontend
npm install

# Create .env file (copy from env.example.txt)
# Windows PowerShell:
Copy-Item env.example.txt .env

# Edit .env and set:
# REACT_APP_API_URL=http://localhost:5000/api

# Start frontend development server
npm start
```

Frontend should open automatically at `http://localhost:3000`

## Step 3: Test the Application

1. **Register a new account:**
   - Click "Apply Now" or "Sign In" → "Register"
   - Fill in the form: Name, Email, Password, Role
   - Submit the form

2. **Login:**
   - Use the credentials you just created
   - You'll be redirected to your profile page

3. **Apply for an internship:**
   - Navigate to the Internships section
   - Click "Apply Now" on any program
   - Application will be submitted and saved

4. **View Profile:**
   - Check your profile page to see your account information
   - Applications will be displayed here once you apply

## Test API Endpoints (Optional)

You can test the API endpoints using Postman or curl:

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Profile (Replace TOKEN with actual JWT token from login)
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Common Issues

**MongoDB Connection Error:**
- Make sure MongoDB is running
- Check MONGODB_URI in backend/.env
- Try: `mongosh` to test MongoDB connection

**Port Already in Use:**
- Change PORT in backend/.env to a different port
- Update REACT_APP_API_URL in frontend/.env accordingly

**CORS Errors:**
- Backend already includes CORS middleware
- Make sure frontend REACT_APP_API_URL matches backend URL

**Module Not Found:**
- Run `npm install` in both frontend and backend directories
- Delete `node_modules` and `package-lock.json`, then reinstall

## Project Structure Summary

```
Techblooms/
├── frontend/          # React.js app (port 3000)
├── backend/           # Express.js API (port 5000)
└── README.md          # Full documentation
```

For detailed documentation, see `README.md`

