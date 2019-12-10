
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./technoidentity-utils.cjs.production.min.js')
} else {
  module.exports = require('./technoidentity-utils.cjs.development.js')
}
