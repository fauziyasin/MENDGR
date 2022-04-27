
require('dotenv').config();

const origins = [
            `http://localhost:3000`,
          ]

const routes = [
  '/db/users/query',
  '/db/users/add', 
  '/db/users/query/:username'
]

  module.exports = { routes, origins }
