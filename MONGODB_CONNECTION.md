# MongoDB Connection String Guide

## Your Connection String: `mongodb://localhost:27017/`

✅ **This is a valid MongoDB connection string!**

---

## Two Connection String Formats

### Format 1: Without Database Name (Your Format)
```
mongodb://localhost:27017/
```
- ✅ Works perfectly
- Connects to MongoDB server
- Uses default database or database specified in code
- Database will be created when first document is saved

### Format 2: With Database Name (Recommended)
```
mongodb://localhost:27017/techblooms
```
- ✅ Works perfectly
- Connects directly to the `techblooms` database
- Database is explicitly specified
- More clear and organized

---

## Which Should You Use?

### **Recommended: Use with database name**
```
MONGODB_URI=mongodb://localhost:27017/techblooms
```

**Why?**
- Explicitly names your database
- More organized
- Easier to identify in MongoDB Compass
- Better practice for production

### **But your format also works!**
```
MONGODB_URI=mongodb://localhost:27017/
```

**What happens:**
- Mongoose will connect to the default database
- When you create a user, Mongoose will use the database name specified in the model schema
- Or it will use the connection's default database

---

## How to Configure for TechBlooms Project

### Step 1: Create `.env` File in Backend Folder

```powershell
cd backend
Copy-Item env.example.txt .env
```

### Step 2: Edit `.env` File

**Option A: Use with database name (Recommended)**
```env
MONGODB_URI=mongodb://localhost:27017/techblooms
```

**Option B: Use your format (Also works)**
```env
MONGODB_URI=mongodb://localhost:27017/
```

**Note:** If you use Option B, Mongoose might create the database with a different name. But it will still work!

---

## Testing Your Connection

### Test 1: Quick Test with Your Format

Create a test file `test-connection.js` in backend folder:

```javascript
const mongoose = require('mongoose');

// Using your connection string
const MONGODB_URI = 'mongodb://localhost:27017/';

console.log('Testing connection with:', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'techblooms' // Specify database name here
  })
  .then(() => {
    console.log('✅ Connected successfully!');
    console.log('✅ Using database: techblooms');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });
```

Run it:
```powershell
cd backend
node test-connection.js
```

### Test 2: Using Our Test Script

We already have a test script that uses the recommended format:

```powershell
cd backend
node ../test-mongodb.js
```

---

## What Happens with Your Connection String

When you use `mongodb://localhost:27017/`:

1. **Mongoose connects to MongoDB server** ✅
2. **Database selection:**
   - If you specify `dbName` in connection options → uses that database
   - If models specify database → uses that database  
   - Otherwise → uses default database (usually `test`)

3. **For TechBlooms:**
   - Our models don't specify a database name
   - So it will use whatever database Mongoose defaults to
   - But we can specify it in the connection options!

---

## Recommended Configuration

### In `backend/.env` file:

```env
# Recommended: Include database name in connection string
MONGODB_URI=mongodb://localhost:27017/techblooms
```

### OR if you prefer your format, update `server.js`:

```javascript
// Option: Add dbName in connection options
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/',
  {
    dbName: 'techblooms', // Specify database name here
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
```

---

## Summary

✅ **Your connection string `mongodb://localhost:27017/` works perfectly!**

**Options:**
1. **Use it as-is** - MongoDB will work, database will be created automatically
2. **Add database name** - More organized: `mongodb://localhost:27017/techblooms`
3. **Use your format with dbName option** - Specify database in code instead

**All three approaches work!** Choose whichever you prefer.

---

## Quick Setup

1. **Create `.env` file:**
   ```powershell
   cd backend
   Copy-Item env.example.txt .env
   ```

2. **Edit `.env` and set:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/techblooms
   ```
   (Or use your format: `mongodb://localhost:27017/`)

3. **Start backend:**
   ```powershell
   npm install
   npm run dev
   ```

4. **Check for:**
   ```
   MongoDB Connected Successfully
   ```

**That's it!** 🚀

