const { Router } = require('express');
const controller = require('../controllers/validationController.js')
const app = Router(); 
  
app.get('/validateUserData', controller); 
  
module.exports = app;