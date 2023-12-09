const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Other config options...
});