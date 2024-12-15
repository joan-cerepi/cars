// Needed resources
const express = require('express')
const router = express.Router()
const utilities = require('../utilities/')
const accountController = require('../controllers/accountController')
const validate = require('../utilities/account-validation')

// Account get routes
router.get('/login', utilities.handleErrors(accountController.buildLogin))
router.get('/register', utilities.handleErrors(accountController.buildRegister))

// Account post routes
router.post(
    '/register',
    validate.registrationRules(),
    validate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
    "/login",
    validate.loginRules(),
    validate.checkLoginData,
    (req, res) => {
      res.status(200).send('login process')
    }
  )

module.exports = router