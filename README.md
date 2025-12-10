# Student Management System

A full-stack web application for managing student records using **Node.js**, **Express**, **Firebase Firestore** (NoSQL), and **EJS** templates.

## 🔥 Features
- ✅ Add new student records
- 📋 View all student records with class filter
- 🗑️ Delete student records by admission number
- 🎨 Clean and responsive UI
- ⚡ Real-time form validation
- 🔒 Firebase security rules
- ☁️ Cloud-based NoSQL database

## Prerequisites
- Node.js (v14 or higher)
- Firebase account (free tier available)
- npm (comes with Node.js)

## 🚀 Setup Instructions

### 1️⃣ Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click **"Add project"** → Name it `student-management-system`
   - Accept terms → **Create project**

2. **Enable Firestore Database**
   - In Firebase Console, click **"Firestore Database"** (left sidebar)
   - Click **"Create database"**
   - Choose **"Start in test mode"** (for development)
   - Select region: **`asia-south1`** (or closest to you)
   - Click **Enable**

3. **Download Service Account Key**
   - Click **⚙️ gear icon** → **"Project settings"**
   - Go to **"Service accounts"** tab
   - Click **"Generate new private key"**
   - Click **"Generate key"** → JSON file downloads
   - **Rename to**: `firebase-credentials.json`
   - **Move to project root**: `c:\Users\krish\Downloads\student_management_system\`

### 2️⃣ Configure Environment

Create a `.env` file in the project root:

```bash
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
PORT=3000
```

### 3️⃣ Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web framework
- `firebase-admin` - Firebase Admin SDK
- `ejs` - Templating engine
- `express-ejs-layouts` - Layout support for EJS
- `dotenv` - Environment variables

### 4️⃣ Start the Server

```bash
npm start
```

The server will start at: **http://localhost:3000**

## 📊 Database Structure

### Firestore Collection: `students`

Each student is stored as a **document** with the admission number as the document ID:

```
students (collection)
  ├─ ADM001 (document)
  │   ├─ name: "John Doe"
  │   ├─ class: "10A"
  │   ├─ roll_no: 15
  │   ├─ address: "123 Main St"
  │   └─ mob_no: "1234567890"
  │
  ├─ ADM002 (document)
  │   └─ ...
```

**Fields:**
- `name` (string) - Student name
- `class` (string) - Class/grade
- `roll_no` (number) - Roll number (optional)
- `address` (string) - Address (optional)
- `mob_no` (string) - Mobile number (optional)

## 🎯 Usage

### 🏠 Home Page
Visit `http://localhost:3000` to see the welcome page

### ➕ Add Student
1. Click **"Add Student"** or visit `/add`
2. Fill in the form:
   - Name (required)
   - Class (required)
   - Admission No (required, must be unique)
   - Roll No (optional)
   - Address (optional)
   - Mobile (optional)
3. Click **"Add Record"**

### 👁️ View Records
1. Click **"View Records"** or visit `/view`
2. See all student records in a table
3. Use the filter to search by class (e.g., "10A")
4. Click **"Clear"** to show all records

### 🗑️ Delete Record
1. Click **"Delete Record"** or visit `/delete`
2. Enter the Admission Number
3. Click **"Delete"**

## 🔐 Security

- ✅ Firebase credential protection (via `.gitignore`)
- ✅ Environment variables for sensitive data
- ✅ Document ID validation
- ✅ Input validation (required fields)

**IMPORTANT:** Never commit `firebase-credentials.json` to Git!

## 🔄 SQL to Firestore Migration

This project was migrated from MySQL to Firestore. Here's how queries changed:

### Add Student
**Before (MySQL):**
```javascript
await db.execute('INSERT INTO students_record VALUES (?, ?, ...)', [values]);
```

**After (Firestore):**
```javascript
await db.collection('students').doc(adm).set({...data});
```

### View Students
**Before (MySQL):**
```javascript
const [rows] = await db.execute('SELECT * FROM students_record WHERE class = ?', [classFilter]);
```

**After (Firestore):**
```javascript
const snapshot = await db.collection('students').where('class', '==', classFilter).get();
```

### Delete Student
**Before (MySQL):**
```javascript
await db.execute('DELETE FROM students_record WHERE adm_no = ?', [adm]);
```

**After (Firestore):**
```javascript
await db.collection('students').doc(adm).delete();
```

## 📁 Project Structure

```
student_management_system/
├── .env                    # Environment variables (create this)
├── .env.example            # Example environment config
├── .gitignore             # Git ignore file
├── firebase-credentials.json  # Firebase key (download this)
├── package.json           # Dependencies
├── server.js              # Main server file
├── db.js                  # Firebase configuration
├── views/                 # EJS templates
│   ├── layout.ejs
│   ├── index.ejs
│   ├── add.ejs
│   ├── view.ejs
│   └── delete.ejs
└── public/
    └── style.css          # Styles
```

## 🐛 Troubleshooting

### "Cannot find module 'firebase-admin'"
- Run `npm install` to install dependencies

### "Port 3000 already in use"
- Change PORT in `.env` file
- Or stop the process using port 3000

### "Failed to initialize Firebase"
- Check `firebase-credentials.json` exists in project root
- Verify the path in `.env` is correct
- Ensure the JSON file is valid

### "Permission denied" errors
- Check Firestore security rules in Firebase Console
- For development, use test mode rules

## 🎨 Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** Firebase Firestore (NoSQL)
- **Template Engine:** EJS with express-ejs-layouts
- **Styling:** Vanilla CSS
- **Cloud Platform:** Google Firebase

## 📜 License

This project is open source and available for educational purposes.

---

**Made with Node.js ❤️ Firebase**
