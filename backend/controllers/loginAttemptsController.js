const admin = require('../firebaseAdmin.js')
const db = admin.firestore();
const { Firestore } = require('firebase-admin/firestore')

const logLoginAttempt = async (req, res) => {
    
    const loginAttemptsCollection = db.collection('loginAttempts');
    const { email, phone, code, status } = req.body;
  
    try {
        if(phone){
            const user = await admin.auth().getUserByPhoneNumber(phone);
        }else{
        }
   
        await loginAttemptsCollection.add({
            email,
            phone,
            code,
            status,
            timestamp: Firestore.FieldValue.serverTimestamp(),
          });
  
      res.status(201).json({ message: 'Login attempt logged successfully' });
    } catch (error) {
      console.error('Error logging login attempt:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getLoginAttempts = async (req, res) => {
    try {
      const loginAttemptsSnapshot = await db.collection('loginAttempts').get();
      const loginAttempts = loginAttemptsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      res.status(200).json(loginAttempts);
    } catch (error) {
      console.error('Error getting login attempts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const updateLoginAttempt = async (req, res) => {
    const { id } = req.params;
    const { status, email, phone, code } = req.body;
  
    try {
        const attemptRef = db.collection('loginAttempts').doc(id);
        const attemptDoc = await attemptRef.get();

        if (!attemptDoc.exists) {
        return res.status(404).json({ error: 'Login attempt not found' });
        }
        const updatedFields = {};
        if (status !== undefined) {
        updatedFields.status = status;
        }
        if (email !== undefined) {
        updatedFields.email = email;
        }
        if (phone !== undefined) {
        updatedFields.phone = phone;
        }
        if (code !== undefined) {
        updatedFields.code = code;
        }

        // Perform the update
        await attemptRef.update(updatedFields);
  
      res.status(200).json({ message: 'Login attempt updated successfully' });
    } catch (error) {
      console.error('Error updating login attempt:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const deleteLoginAttempt = async (req, res) => {
    const { id } = req.params;
  
    try {
      await db.collection('loginAttempts').doc(id).delete();
  
      res.status(200).json({ message: 'Login attempt deleted successfully' });
    } catch (error) {
      console.error('Error deleting login attempt:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = { logLoginAttempt, getLoginAttempts, updateLoginAttempt, deleteLoginAttempt }
  