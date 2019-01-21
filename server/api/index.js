const express = require('express')
const router = express.Router()

require('./routes/user')(router)
require('./routes/book')(router)
require('./routes/borrow')(router)

module.exports = router
