# How to Push Your TechBlooms Project to GitHub

## Step 1: Install Git (If Not Already Installed)

### Check if Git is Installed

Open PowerShell and run:
```powershell
git --version
```

### If Git is NOT Installed:

1. **Download Git for Windows:**
   - Visit: https://git-scm.com/download/win
   - Download the installer (64-bit)

2. **Install Git:**
   - Run the installer
   - Choose default settings (recommended)
   - Click "Next" through all steps
   - Important: Choose "Git from the command line and also from 3rd-party software"

3. **Restart your terminal/PowerShell** after installation

4. **Configure Git** (First time setup):
   ```powershell
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

---

## Step 2: Create a GitHub Account (If You Don't Have One)

1. Go to: https://github.com
2. Click "Sign up"
3. Create your account
4. Verify your email

---

## Step 3: Create a New Repository on GitHub

1. **Log in to GitHub**

2. **Click the "+" icon** (top right) → **"New repository"**

3. **Fill in repository details:**
   - **Repository name:** `techblooms` (or any name you prefer)
   - **Description:** `Full-stack research platform with React.js frontend and Node.js/Express backend`
   - **Visibility:** Choose Public or Private
   - ⚠️ **IMPORTANT:** Do NOT check "Initialize this repository with a README"
   - ⚠️ **Do NOT** add .gitignore or license (we already have these)

4. **Click "Create repository"**

5. **Copy the repository URL** (you'll see something like):
   ```
   https://github.com/yourusername/techblooms.git
   ```
   OR if using SSH:
   ```
   git@github.com:yourusername/techblooms.git
   ```

---

## Step 4: Initialize Git in Your Project

Open PowerShell/Terminal in your project directory (`d:\Techblooms\TB`):

```powershell
# Navigate to project root (if not already there)
cd d:\Techblooms\TB

# Initialize Git repository
git init

# Check status
git status
```

---

## Step 5: Add All Files to Git

```powershell
# Add all files to staging area
git add .

# Check what will be committed (make sure .env files are NOT listed!)
git status
```

**Important:** Verify that `.env` files are NOT being committed. They should show as ignored.

If you see `.env` files in the status, they won't be committed because we have them in `.gitignore`.

---

## Step 6: Create Initial Commit

```powershell
# Create your first commit
git commit -m "Initial commit: TechBlooms full-stack application

- React.js frontend with all components
- Node.js/Express backend with MongoDB
- Authentication with JWT and bcrypt
- Application submission system
- Protected routes and API endpoints"
```

---

## Step 7: Connect to GitHub Repository

```powershell
# Add GitHub repository as remote origin
# Replace 'yourusername' and 'techblooms' with your actual values
git remote add origin https://github.com/yourusername/techblooms.git

# Verify remote was added
git remote -v
```

---

## Step 8: Push Code to GitHub

```powershell
# Push to GitHub (first time - sets upstream)
git branch -M main
git push -u origin main
```

**Note:** You may be prompted for your GitHub username and password:
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (not your GitHub password)

### If Authentication Fails - Create Personal Access Token:

1. **Go to GitHub Settings:**
   - Click your profile picture (top right) → **Settings**
   - Scroll down to **Developer settings** (left sidebar)
   - Click **Personal access tokens** → **Tokens (classic)**

2. **Generate New Token:**
   - Click **"Generate new token (classic)"**
   - Give it a name: `TechBlooms Project`
   - Select expiration (or no expiration)
   - **Check scopes:** `repo` (this includes all repository permissions)
   - Click **"Generate token"**

3. **Copy the token** (you won't see it again!)

4. **Use the token as password** when pushing:
   ```powershell
   git push -u origin main
   # Username: your-github-username
   # Password: paste-your-token-here
   ```

---

## Step 9: Verify on GitHub

1. Go to your GitHub repository: `https://github.com/yourusername/techblooms`
2. You should see all your files!
3. Check that `.env` files are NOT visible (they should be ignored)

---

## Complete Command Sequence (Copy & Paste)

Here's the complete sequence of commands (replace `yourusername` and `techblooms`):

```powershell
# Navigate to project
cd d:\Techblooms\TB

# Initialize Git
git init

# Add all files
git add .

# Check status (verify .env files are ignored)
git status

# Create initial commit
git commit -m "Initial commit: TechBlooms full-stack application"

# Add GitHub remote (REPLACE yourusername/techblooms with your values)
git remote add origin https://github.com/yourusername/techblooms.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Quick Reference: Common Git Commands

### Check Status
```powershell
git status
```

### Add Files
```powershell
# Add all files
git add .

# Add specific file
git add filename.js
```

### Commit Changes
```powershell
git commit -m "Your commit message"
```

### Push to GitHub
```powershell
git push
```

### Pull Latest Changes
```powershell
git pull
```

### View Commit History
```powershell
git log --oneline
```

### Check What Files Are Ignored
```powershell
git status --ignored
```

---

## Important: What NOT to Commit

✅ **DO commit:**
- Source code (`.js`, `.jsx`, `.json`, `.md`, `.css`)
- Configuration files (`package.json`, `README.md`)
- Project structure and folders

❌ **DO NOT commit:**
- `.env` files (contains secrets!)
- `node_modules/` (dependencies)
- Build files (`/build`, `/dist`)
- Log files (`*.log`)
- Personal data or API keys

**Good News:** We've already set up `.gitignore` files to automatically exclude these!

---

## Updating Your Repository (After Making Changes)

When you make changes to your code later:

```powershell
# Check what changed
git status

# Add changed files
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

---

## Troubleshooting

### Issue: "fatal: not a git repository"

**Solution:** Make sure you're in the project directory and run:
```powershell
git init
```

### Issue: Authentication Failed

**Solution:** 
- Use Personal Access Token instead of password
- Make sure token has `repo` scope
- Try using SSH instead of HTTPS

### Issue: "Updates were rejected"

**Solution:** 
```powershell
git pull origin main --rebase
git push origin main
```

### Issue: Large File Warning

**Solution:** Make sure `node_modules/` is in `.gitignore`. If already committed:
```powershell
git rm -r --cached node_modules
git commit -m "Remove node_modules from git"
git push
```

### Issue: Want to Remove Already Committed .env File

If you accidentally committed `.env`:

```powershell
# Remove from git (but keep local file)
git rm --cached backend/.env
git rm --cached frontend/.env

# Commit the removal
git commit -m "Remove .env files from repository"

# Push changes
git push
```

---

## Using GitHub Desktop (Alternative - Easier GUI Method)

If you prefer a visual interface:

1. **Download GitHub Desktop:**
   - https://desktop.github.com/

2. **Install and Sign In:**
   - Sign in with your GitHub account

3. **Add Repository:**
   - File → Add Local Repository
   - Select: `d:\Techblooms\TB`
   - Click "Add repository"

4. **Commit & Push:**
   - Write commit message
   - Click "Commit to main"
   - Click "Publish repository" (first time)
   - Or "Push origin" (after first time)

---

## Summary

✅ **Prerequisites:**
1. Install Git
2. Create GitHub account
3. Create new repository on GitHub

✅ **Commands:**
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/techblooms.git
git branch -M main
git push -u origin main
```

✅ **Result:**
- Code is on GitHub
- Safe to share
- Easy to collaborate
- Version controlled

**You're ready to push! 🚀**

