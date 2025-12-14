// db.js
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
// Support both local development and production (Vercel)
let serviceAccount;

// Check if running on Vercel with environment variable
if (process.env.FIREBASE_CREDENTIALS_JSON) {
    console.log('Using Firebase credentials from environment variable');
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON);
    } catch (error) {
        console.error('Error parsing FIREBASE_CREDENTIALS_JSON:', error.message);
        throw new Error('Invalid Firebase credentials in environment variable');
    }
} else if (process.env.FIREBASE_CREDENTIALS_PATH || require('fs').existsSync('./firebase-credentials.json')) {
    // Local development: Use JSON file
    console.log('Using Firebase credentials from file');
    const serviceAccountPath = process.env.FIREBASE_CREDENTIALS_PATH || './firebase-credentials.json';
    serviceAccount = require(path.resolve(serviceAccountPath));
} else {
    throw new Error('Firebase credentials not found! Set FIREBASE_CREDENTIALS_JSON environment variable or provide firebase-credentials.json file');
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Get Firestore database instance
const db = admin.firestore();

module.exports = db;
