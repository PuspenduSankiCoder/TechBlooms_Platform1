# Quick Setup Guide - Using Your MongoDB Connection String

## Your Connection String: `mongodb://localhost:27017/` ✅

This is valid! Here's how to use it:

---

## Step-by-Step Setup

### Step 1: Create Backend .env File

```powershell
cd backend
Copy-Item env.example.txt .env
```

### Step 2: Edit `.env` File

Open `backend/.env` in a text editor and set:

**Option A: Use your format (without database name)**
```env
MONGODB_URI=mongodb://localhost:27017/
```

**OR Option B: Add database name (recommended)**
```env
MONGODB_URI=mongodb://localhost:27017/techblooms
```

**Both work!** Option B is clearer because it specifies the database name.

---

### Step 3: If Using Your Format (Option A)

If you use `mongodb://localhost:27017/`, you need to uncomment the `dbName` option in `server.js`:

**Edit `backend/server.js` line 30:**
```javascript
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'techblooms', // Uncomment this line if using mongodb://localhost:27017/
  })
```

**Or just use Option B** (easier - no code changes needed):
```env
MONGODB_URI=mongodb://localhost:27017/techblooms
```

---

### Step 4: Install Dependencies

```powershell
cd backend
npm install
```

### Step 5: Start Backend Server

```powershell
npm run dev
```

You should see:
```
MongoDB Connected Successfully
Connected to database: techblooms
Server is running on port 5000
```

---

## Summary: Two Options

### ✅ Option 1: Your Format (requires code change)
```env
MONGODB_URI=mongodb://localhost:27017/
```
**Then uncomment `dbName: 'techblooms'` in server.js**

### ✅ Option 2: With Database Name (no code change needed) - RECOMMENDED
```env
MONGODB_URI=mongodb://localhost:27017/techblooms
```
**Just use this - works immediately!**

---

## Which Should You Use?

**Recommendation: Use Option 2** (`mongodb://localhost:27017/techblooms`)

**Why?**
- ✅ No code changes needed
- ✅ Database name is explicit and clear
- ✅ Easier to understand
- ✅ Better practice

**But both work perfectly!** Choose whichever you prefer.

---

## Test Your Connection

After starting the backend, you'll see:
```
✅ MongoDB Connected Successfully
✅ Connected to database: techblooms
```

If you see this, everything is working! 🚀

---

## Next Steps

1. ✅ Create `.env` file with your MongoDB connection string
2. ✅ Install dependencies: `npm install`
3. ✅ Start backend: `npm run dev`
4. ✅ See "MongoDB Connected Successfully" message
5. ✅ Start frontend and use the app!

**That's it!** 🎉

