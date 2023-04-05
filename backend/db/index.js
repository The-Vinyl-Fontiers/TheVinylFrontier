// EXPORTING all database functions.
module.exports = {
    ...require('./users'), 
    ...require('./orders'), 
    ...require('./Payments'), 
    ...require('./order_products'),
    ...require('./tags'), 
    ...require('./vinyl'), 
    // ...require('./vinyl_tags')
  }