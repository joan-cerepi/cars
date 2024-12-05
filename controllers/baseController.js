// Bring required packages into scope
const utilities = require("../utilities/")

const baseController = {}

// Build Home View
baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {
    title: "Home", 
    nav
  })
}

// Intentional Error 500
baseController.throwError = async function(req, res) {
  const nav = await utilities.getNav();
  const error = new Error('This is a server side error.')
  error.status = 500
  res.render('errors/error', {
    title: 'Internal Server Error ' + error.status,
    nav,
    message: error.message
  })
}

module.exports = baseController