const { Router } = require('express');
const {logLoginAttempt} = require('../../controllers/loginAttemptsController.js');
const app = Router(); 
  
app.post('/log', logLoginAttempt); 
  
module.exports = app;