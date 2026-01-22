# Quick Guide: Push to GitHub (5 Minutes)

## Step 1: Install Git ⬇️

**Download & Install:**
- Visit: https://git-scm.com/download/win
- Download and install (use default settings)
- **Restart your terminal** after installation

**Configure Git** (first time only):
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Step 2: Create GitHub Repository 🌐

1. Go to: https://github.com (sign up if needed)
2. Click **"+"** → **"New repository"**
3. Name: `techblooms` (or any name)
4. **DO NOT** check "Initialize with README"
5. Click **"Create repository"**
6. **Copy the repository URL** shown (looks like: `https://github.com/yourusername/techblooms.git`)

---

## Step 3: Push Your Code 🚀

Open PowerShell in `d:\Techblooms\TB` and run:

```powershell
# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: TechBlooms full-stack application"

# Connect to GitHub (REPLACE with your actual URL)
git remote add origin https://github.com/yourusername/techblooms.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 4: Authentication 🔐

When prompted:
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (NOT your GitHub password)

**Create Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Name it, check `repo` scope
4. Generate and **copy the token**
5. Use this token as your password

---

## ✅ Done!

Your code is now on GitHub! Visit: `https://github.com/yourusername/techblooms`

**For detailed instructions, see `GITHUB_SETUP.md`**

