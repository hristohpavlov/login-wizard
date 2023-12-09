const express = require('express')
const validateUserDataRoute = require('./routers/validationRouter.js')
const generateEmailOTPRoute = require('./routers/generateEmailOTPRouter.js')
const changeUserPasswordRoute = require('./routers/changeUserPasswordRouter.js')
const sendMailRoute = require('./routers/sendMailRouter.js')
const storeAuthIdRoute = require('./routers/storeAuthIdRouter.js')
const logLoginAttemptRoute = require('./routers/logRoutes/logLoginAttemptRouter.js')
const getLoginAttemptsRoute = require('./routers/logRoutes/getLoginAttemptsRouter.js')
const updateLoginAttemptRoute = require('./routers/logRoutes/updateLoginAttemptRouter.js')
const deleteLoginAttemptRoute = require('./routers/logRoutes/deleteLoginAttemptRouter.js')
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api', 
  validateUserDataRoute,
  generateEmailOTPRoute,
  changeUserPasswordRoute, 
  sendMailRoute, 
  storeAuthIdRoute,
  logLoginAttemptRoute,
  getLoginAttemptsRoute,
  updateLoginAttemptRoute,
  deleteLoginAttemptRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});