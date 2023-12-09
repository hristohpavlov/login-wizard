const admin = require('../firebaseAdmin.js')
const auth = admin.auth();

// Controller function for changing user password
module.exports = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await auth.getUserByEmail(email);
    await auth.updateUser(user.uid, { password: newPassword });

    // Send a success response
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    // Send an error response
    res.status(500).json({ error: 'Failed to change password' });
  }
};