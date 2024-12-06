// Needed resources
const express = require('express')
const router = express.Router()
const utilities = require('../utilities/')
const accountController = require('../controllers/accountController')

// Account routes
router.get('/login', utilities.handleErrors(accountController))

module.exports = router