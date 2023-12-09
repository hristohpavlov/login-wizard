module.exports = (req, res) => { 
    try {
        const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
        res.status(200).json({ password: randomSixDigitNumber.toString() });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};