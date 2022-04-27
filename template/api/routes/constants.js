
require('dotenv').config();

const origins = [
            'https://api.sologenic.org/api/v1/*',
            'https://checkbook-whirled-app.herokuapp.com/',
            `http://localhost:${process.env.API_PORT}`,
            `http://localhost:3020`,
            `http://localhost/client`,
            `http://localhost:3070`,
            `http://localhost`,
            '*','https://apps.xumm.dev', 
            'https://xapp.loca.lt', 
            'https://xumm.app/detect/xapp:whirled.port', 
            'https://interport.io', 
            'https://api.sologenic.org/api/v1/issuer/transactions', 
            'https://app-whirled-interport.herokuapp.com'
          ]

const routes = [
  '/db/search/:value',
  '/db/users/query',
  '/db/users/all',
  '/db/users/delete',
  '/db/users/auth',
  '/db/users/authAdd',
  '/db/users/authChange',
  '/db/users/query/:key',
  '/db/users/remove',
  '/db/users/update',
  '/db/users/add',
  '/db/currencies/:currency',
  '/xumm/meta/:uuid',
  '/xumm/init/:uuid',
  '/send',
  '/groupsend',
  '/hash/:uuid',
  '/qr',
  '/db/query/payloads/:wallet',
  '/db/payload/insert',
  '/xapp/ott/:token',
  '/curated-assets',
  '/payload',
  '/payload/:payload_uuid',
  '/event',
  '/push',
  '/xumm/init'
]

  module.exports = { routes, origins }
