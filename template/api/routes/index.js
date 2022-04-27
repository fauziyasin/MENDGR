const express = require('express');
const router = express.Router();
const controller = require('../controllers/db')
const middle = require('./middleware')
  
router
    .get('/col/query', /* middle.reqApiKeyMatch, */ controller.query)

module.exports = router;