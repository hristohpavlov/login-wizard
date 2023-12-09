const { Router } = require('express');
const { deleteLoginAttempt } = require('../../controllers/loginAttemptsController.js');
const { protectRouteMiddleware } = require('../../middleware/authMiddleware.js');
const app = Router(); 
  
app.delete('/attempts/:id', protectRouteMiddleware, deleteLoginAttempt); 
  
module.exports = app;