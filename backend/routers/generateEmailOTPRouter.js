const { Router } = require('express');
const controller = require('../controllers/generateEmailOTPController.js')
const app = Router(); 
  
app.get('/generateEmailOTP', controller); 
  
module.exports = app;