const { Router } = require('express');
const controller = require('../controllers/storeAuthIdController.js')
const app = Router(); 
  
app.post('/storeAuthId', controller); 
  
module.exports = app;