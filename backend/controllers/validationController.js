const validator = require('validator'); 

module.exports = (req, res) => { 
    //validation of User Data: Email and Phone
    try {
        const { mobile, email } = req.query;
        //Basic email validation
        if (!validator.isEmail(email)) {
          return res.status(400).json({ error: 'Invalid email address' });
        }
        //Basic phone validation + length = 10 and starting with 0
        if (!validator.isMobilePhone(mobile, 'any', { strictMode: false }) && mobile.length !== 10 && !mobile.startsWith('0')) {
          return res.status(400).json({ error: 'Invalid mobile number' });
        }
        res.status(200).json({ message: 'Validation successful' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};