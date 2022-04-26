const express = require('express');
const http = require('http');
const app = express();
const port = process.env.API_PORT || 4001;
const publicRun = process.argv[2];
require('dotenv').config();

const constants = require('./constants.js')

const cors = require('cors');

const corsOptions = {
  origin: constants.origins
  // methods: 'GET, POST, OPTIONS'
}  

app.use(constants.routes, cors(corsOptions));
app.use(constants.routes, express.json({limit:"1mb"}));

const server = http.createServer(app);
(!publicRun == "public") ? server.listen(port) : server.listen(port, '0.0.0.0');
console.log('Server is running on port', port);
  