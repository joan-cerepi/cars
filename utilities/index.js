const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '<hr />'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

Util.buildVehicleDetailView = async function(data) {
  let vehicleDetails
  if (data) {
    const make = data.inv_make
    const model = data.inv_model
    const year = data.inv_year
    const description = data.inv_description
    const image = data.inv_image
    const price = formatCurrency(data.inv_price, 'USD')
    const miles = formatNumber(data.inv_miles)
    const color = data.inv_color

    vehicleDetails = `
      <section class="vehicle-details">
        <h2>${make} ${model} ${year}</h2>

        <div class="vehicle-display">
          <img src="${image}" alt="${make} ${model} ${year} image" class="vehicle-image" loading="lazy">
          <p class="vehicle-description">${description}</p>
        </div>

        <div class="vehicle-data">
          <h2>Vehicle Data</h2>
          <p>Price: ${price}</p>
          <p>Mileage: ${miles}</p>
          <p>Color: ${color}</p>
        </div>
      </section>
    `
  } else {
    vehicleDetails = '<p>The vehicle you have selected does not exist.</p>'
  }
  return vehicleDetails
}

function formatNumber(number) {
  return number.toLocaleString()
}

function formatCurrency(price, curr) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: curr.toUpperCase()
  }).format(price)
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util