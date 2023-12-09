const { Router } = require('express');
const {updateLoginAttempt} = require('../../controllers/loginAttemptsController.js');
const { protectRouteMiddleware } = require('../../middleware/authMiddleware.js');
const app = Router(); 
  
app.put('/attempts/:id', protectRouteMiddleware, updateLoginAttempt); 
  
module.exports = app;