// db.js
require('dotenv').config();
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccountPath = process.env.FIREBASE_CREDENTIALS_PATH || './firebase-credentials.json';

admin.initializeApp({
    credential: admin.credential.cert(require(path.resolve(serviceAccountPath)))
});

// Get Firestore database instance
const db = admin.firestore();

module.exports = db;
