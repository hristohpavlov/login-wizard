const admin = require('../firebaseAdmin.js');

module.exports = async(req, res) => { 
    const { idToken } = req.body;

  try {
    // Verify the ID token using the Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    res.status(200).send('ID token received and verified successfully');
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(500).send('Error verifying ID token');
  }
};