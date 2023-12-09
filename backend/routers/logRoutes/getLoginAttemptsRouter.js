const { Router } = require('express');
const {getLoginAttempts} = require('../../controllers/loginAttemptsController.js');
const { protectRouteMiddleware } = require('../../middleware/authMiddleware.js');
const app = Router(); 
  
app.get('/attempts', protectRouteMiddleware ,getLoginAttempts); 
  
module.exports = app;