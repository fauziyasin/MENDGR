
require('dotenv').config();

const origins = [
            `http://localhost:3000`,
          ]

const routes = [
  '/db/col/query',
]

  module.exports = { routes, origins }
