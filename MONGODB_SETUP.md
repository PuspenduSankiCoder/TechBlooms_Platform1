# MongoDB Setup Guide for TechBlooms Project

## ✅ Good News: MongoDB is Already Installed!

You have MongoDB version 8.2.3 installed on your system. Now you just need to **start it**.

---

## Option 1: Start MongoDB as a Windows Service (Recommended)

### Check if MongoDB Service Exists

```powershell
Get-Service -Name MongoDB -ErrorAction SilentlyContinue
```

### If Service Exists:
```powershell
# Start MongoDB Service
net start MongoDB

# Or using PowerShell
Start-Service -Name MongoDB

# Stop MongoDB Service (when needed)
net stop MongoDB
```

### If Service Doesn't Exist, Install MongoDB as a Service:

1. **Open Command Prompt as Administrator**

2. **Navigate to MongoDB bin directory** (usually one of these):
   ```cmd
   cd "C:\Program Files\MongoDB\Server\8.2\bin"
   ```
   OR
   ```cmd
   cd "C:\Program Files\MongoDB\Server\8.0\bin"
   ```

3. **Install MongoDB as a Windows Service:**
   ```cmd
   mongod --install --serviceName "MongoDB" --serviceDisplayName "MongoDB" --dbpath "C:\data\db"
   ```

4. **Create data directory** (if it doesn't exist):
   ```cmd
   mkdir C:\data\db
   ```

5. **Start the service:**
   ```cmd
   net start MongoDB
   ```

---

## Option 2: Start MongoDB Manually (For Testing)

If you don't want to install as a service, you can start MongoDB manually:

### Step 1: Create Data Directory

```powershell
# Create the default data directory
New-Item -ItemType Directory -Force -Path "C:\data\db"
```

### Step 2: Start MongoDB

Open a **new terminal/command prompt** and run:

```cmd
mongod
```

This will start MongoDB and keep running until you close the terminal (Ctrl+C to stop).

**Note:** Keep this terminal open while your application is running!

---

## Option 3: Use MongoDB Compass (GUI - Optional but Recommended)

MongoDB Compass is a GUI tool that makes it easier to view and manage your database.

1. **Download MongoDB Compass:**
   - Visit: https://www.mongodb.com/try/download/compass
   - Download and install

2. **Connect to Local MongoDB:**
   - Open MongoDB Compass
   - Connection string: `mongodb://localhost:27017`
   - Click "Connect"

3. **Create Database:**
   - Once connected, click "Create Database"
   - Database name: `techblooms`
   - Collection name: `users` (optional, will be created automatically)

---

## Verify MongoDB is Running

### Method 1: Check if port 27017 is listening

```powershell
netstat -an | findstr 27017
```

If you see something like `TCP 0.0.0.0:27017`, MongoDB is running!

### Method 2: Connect using mongo shell

```cmd
mongosh
```

Or (older versions):
```cmd
mongo
```

If it connects successfully, you'll see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true
Using MongoDB: 8.2.3
```

Type `exit` to leave the shell.

### Method 3: Test from your Node.js app

Once your backend is running, MongoDB will automatically connect. Check your backend terminal for:
```
MongoDB Connected Successfully
```

---

## Configuration for TechBlooms Project

### Step 1: Create Backend .env File

Navigate to the backend folder and create a `.env` file:

```powershell
cd backend
Copy-Item env.example.txt .env
```

### Step 2: Edit .env File

The MongoDB connection string is already configured in `env.example.txt`:

```env
MONGODB_URI=mongodb://localhost:27017/techblooms
```

This means:
- **Host:** localhost (your local machine)
- **Port:** 27017 (default MongoDB port)
- **Database:** techblooms (will be created automatically)

### Step 3: What Happens When You Start Your Backend

When you run your backend server:

```powershell
cd backend
npm install
npm run dev
```

The application will:
1. ✅ Connect to MongoDB automatically
2. ✅ Create the `techblooms` database if it doesn't exist
3. ✅ Create `users` and `applications` collections automatically when you register/login

**You don't need to create the database manually!** Mongoose will do it automatically.

---

## Common Issues & Solutions

### Issue 1: "Port 27017 already in use"

**Solution:** Another MongoDB instance is already running. That's fine! Your app will connect to it.

### Issue 2: "Cannot connect to MongoDB"

**Solutions:**
1. Make sure MongoDB is running:
   ```powershell
   Get-Process -Name mongod
   ```

2. Check if the service is started:
   ```powershell
   net start MongoDB
   ```

3. Verify port 27017 is listening:
   ```powershell
   netstat -an | findstr 27017
   ```

### Issue 3: "Data directory doesn't exist"

**Solution:** Create the data directory:
```powershell
New-Item -ItemType Directory -Force -Path "C:\data\db"
```

### Issue 4: "Access Denied" when installing service

**Solution:** Run Command Prompt as Administrator

---

## Quick Start Summary

1. **Start MongoDB** (choose one):
   ```powershell
   # Option A: If service exists
   net start MongoDB
   
   # Option B: Start manually (keep terminal open)
   mongod
   ```

2. **Verify MongoDB is running:**
   ```powershell
   mongosh
   # Type 'exit' to leave
   ```

3. **Start your backend:**
   ```powershell
   cd backend
   npm install
   npm run dev
   ```

4. **Look for this message:**
   ```
   MongoDB Connected Successfully
   Server is running on port 5000
   ```

---

## Using MongoDB Compass to View Data (Recommended)

After you start using the application and create accounts:

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Click on `techblooms` database
4. View your `users` and `applications` collections
5. See all registered users and their applications!

This is very helpful for debugging and seeing what data is being stored.

---

## Next Steps

Once MongoDB is running:

1. ✅ Your backend will connect automatically when you start it
2. ✅ Database and collections will be created automatically
3. ✅ You can start using the application immediately!

**That's it! You're ready to go!** 🚀

