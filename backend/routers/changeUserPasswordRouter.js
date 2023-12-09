const { Router } = require('express');
const controller = require('../controllers/authController.js')
const app = Router(); 
  
app.post('/changeUserPassword', controller); 
  
module.exports = app;