// Needed resources
const express = require('express')
const router = express.Router()
const utilities = require('../utilities/')
const accountController = require('../controllers/accountController')
const regValidate = require('../utilities/account-validation')

// Account get routes
router.get('/login', utilities.handleErrors(accountController.buildLogin))
router.get('/register', utilities.handleErrors(accountController.buildRegister))

// Account post routes
router.post(
    '/register',
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

module.exports = router