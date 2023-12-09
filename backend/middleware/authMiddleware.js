const admin = require('../firebaseAdmin');

const protectRouteMiddleware = async (req, res, next) => {
  try {
    let idToken;
    // Check if the token is provided in the Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      idToken = authHeader.split('Bearer ')[1];
    }

    // If not in headers, check if it's in the request body
    if (!idToken && req.body) {
      idToken = req.body.idToken;
    }

    if (!idToken) {
      throw new Error('No ID token provided');
    }
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { protectRouteMiddleware };