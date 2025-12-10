# Deployment Guide

## 🚀 Deploy to Render (Free Tier)

### Step 1: Push to GitHub

1. **Initialize Git** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Student Management System"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository
   - Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Set Up Firebase Credentials as Environment Variable

**Open your `firebase-credentials.json` file and copy the entire content.**

You'll need to add it as an environment variable on Render.

### Step 3: Update `db.js` for Production

The current `db.js` needs to support both local development and production.

**Option A: Use Base64 encoding** (simpler)
1. Convert your JSON to base64
2. Store as environment variable
3. Decode in `db.js`

**Option B: Use individual fields** (more secure)
1. Extract key fields from JSON
2. Store each as separate environment variables

### Step 4: Deploy to Render

1. Go to https://render.com
2. Sign up / Sign in
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Name**: student-management-system
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   - `FIREBASE_CREDENTIALS` = (your firebase-credentials.json content as base64)
   - `PORT` = 3000
7. Click **"Create Web Service"**

### Step 5: Update Firestore Rules (Important!)

In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{studentId} {
      allow read, write: if true; // For now - change later for security
    }
  }
}
```

---

## Alternative: Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard

---

## 🔒 Security Notes

- Never commit `firebase-credentials.json` to GitHub ✅ (already in .gitignore)
- Use environment variables for production
- Update Firestore security rules before going live
- Consider adding authentication
