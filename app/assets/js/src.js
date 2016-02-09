/**
 * Modules
 * @type {Public}
 */
var contentful = require('contentful')


/**
 * Modules
 * @type {Private}
 */
var secrets = require('../../../config/secrets.js'),
    client;



/**
 * Initialize
 */
init = function(callback) {
  client = contentful.createClient({
    accessToken : secrets.contentful.accessToken,
    space : secrets.contentful.space
  })  

  callback()
}


init(function() {

  client.entry('6M9lbETeOQqiwKwsCO2qGU')
    .then(function (res, err) {

      var cityName = res.fields.cityName;

      console.log( cityName  )
    })
    
})
