const { Router } = require('express');
const controller = require('../controllers/sendMailController.js')
const app = Router(); 
  
app.post('/sendMail', controller); 
  
module.exports = app;