const CORS = require('cors')
module.exports = CORS({
  credentials: true,
  methods: ['OPTION', 'GET', 'POST', 'PUT', 'DELETE'],
  origin: "*"
})