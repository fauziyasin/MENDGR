const mongo = require('../../scripts/mongo.js');

const search = async (req, res) => {
    try {
        const value = req.params.value
        let record1 = await mongo.searchReg('users', value)
          res.send({data: record1,
                    msg: 'User found in database'});
  
    } catch(e) { 
      console.log(`API error @ db query: ${e.message}`)
        res.status(400).json({
          msg: e.message,
          error: true
        })
    }
  };
  
const updateUser = async (req, res) => {
     try{
      let requestKeys = Object.keys(req.body.meta)
      let record = await mongo.findUser('users', {usr: req.body.usr});
      let objKeys = Object.keys(record[0].meta)
      let newMeta = {};
      objKeys.forEach((key, i) => {
        if ( requestKeys.indexOf(key) == -1) newMeta[key] = record[0].meta[key] //unchanged 
        if ( requestKeys.indexOf(key) > -1) {
          if (typeof(record[0].meta[key]) == 'string' 
            || typeof(record[0].meta[key]) == 'number' 
            || record[0].meta[key] == null) newMeta[key] = req.body.meta[key] //changed 
          if (record[0].meta[key] instanceof Array) {
            if (record[0].meta[key].indexOf(req.body.meta[key]) > -1) return newMeta[key] = record[0].meta[key]; //already exists
            newMeta[key] = req.body.meta[key] //changed 
          }
        } 
      })
    
      let changeStatus = await mongo.insertOrUpdate('users', {usr: record[0].usr, meta: newMeta})
  
      res.send({  data: changeStatus,
                  msg: 'User information updated in db'});
  
    } catch(e){
      console.log(`API error @ init: ${e.message}`)
      res.status(400).json({
        msg: e.message,
        error: true
      })
    }
  };
  
const addUser = async (req, res) => {
    try{
      let changeStatus = await mongo.insertOrUpdate('users', 
        {usr: req.body.usr, meta: req.body.meta}
      )
  
      res.send({  data: changeStatus,
                  msg: 'User information updated in db'});
  
    } catch(e){
      console.log(`API error @ init: ${e.message}`)
      res.status(400).json({
        msg: e.message,
        error: true
      })
    }
  };
  
const removeUser = async (req, res) => {
    try{
      let requestKeys = Object.keys(req.body.meta)
      let record = await mongo.findUser('users', {key:req.body.key});
      let objKeys = Object.keys(record[0].meta)
      let newMeta = {};
      objKeys.forEach((key, i) => {
        if ( requestKeys.indexOf(key) == -1) newMeta[key] = record[0].meta[key] //unchanged 
        if ( requestKeys.indexOf(key) > -1) {
          if (typeof(record[0].meta[key]) == 'string' 
            || typeof(record[0].meta[key]) == 'number' 
            || record[0].meta[key] == null) newMeta[key] = null
          if (record[0].meta[key] instanceof Array) newMeta[key] = record[0].meta[key].filter(item => item != req.body.meta[key])
        } //changed 
      })
  
      let changeStatus = await mongo.insertOrUpdate('users', {key: record[0].key, meta: newMeta})
  
      res.send({  data: changeStatus,
                  msg: 'User information updated in db'});
  
    } catch(e){
      console.log(`API error @ init: ${e.message}`)
      res.status(400).json({
        msg: e.message,
        error: true
      })
    }
  };
  
const query = async (req, res) => {
    try {
        let record = await mongo.findAll('users')
  
        if (record[0]) {
          res.send({data: record,
                    msg: 'Users found in database'});
        } else { 
          res.send({data: null,
                    msg: 'Users not found in database'});
        }
  
    } catch(e) { 
      console.log(`API error @ db query: ${e.message}`)
        res.status(400).json({
          msg: e.message,
          error: true
        })
    }
  };

const getUser = async (req, res) => {
    try {
        const username = req.params.username
        let record = await mongo.findUser('users', {usr:username})
  
        if (record[0]) {
          res.send({data: record[0],
                    msg: 'User found in database'});
        } else { 
          res.send({data: null,
                    msg: 'User not found in database'});
        }
  
    } catch(e) { 
      console.log(`API error @ db query: ${e.message}`)
        res.status(400).json({
          msg: e.message,
          error: true
        })
    }
  };
  
const deleteUser =  async (req, res) => {
    try{
      let changeStatus = await mongo.deleteItem('users', {key: req.body.key})
  
      res.send({  data: changeStatus,
                  msg: 'User deteled from db'});
  
    } catch(e){
      console.log(`API error @ init: ${e.message}`)
      res.status(400).json({
        msg: e.message,
        error: true
      })
    }
  };

  const authUser =  async (req, res) => {
    try{
      let col;
      if (req.body.type == 'pin') col = 'pins'
      if (req.body.type == 'password') col = 'passwords'
      if (req.body.type == 'xumm') col = 'xumms'

      let verifyStatus = await mongo.authUser(col, {   
            usr: req.body.usr,
            auth: req.body.auth
        })
 
      res.send({  data: verifyStatus,
                  msg: 'Verification complete'});
  
    } catch(e){
      console.log(`API error @ db auth: ${e.message}`)
      res.status(400).json({
        msg: e.message,
        error: true
      })
    }
  };

  const authChange =  async (req, res) => {
    try{
      let col;
      if (req.body.type == 'pin') col = 'pins'
      if (req.body.type == 'password') col = 'password'
      if (req.body.type == 'xumm') col = 'xumms'

      let changeStatus = await mongo.authChange(col, {   
            usr: req.body.usr,
            auth: req.body.auth
        })
  
      res.send({  data: changeStatus,
                  msg: 'Change complete'});
  
    } catch(e){
      console.log(`API error @ db change auth: ${e.message}`)
      res.status(400).json({
        msg: e.message,
        error: true
      })
    }
  };

  const authAdd =  async (req, res) => {
    try{
      let col;
      if (req.body.type == 'pin') col = 'pins'
      if (req.body.type == 'password') col = 'passwords'
      if (req.body.type == 'xumm') col = 'xumms'

      let addStatus = await mongo.authAdd(col, {   
            usr: req.body.usr,
            auth: req.body.auth
        })
  
      res.send({  data: addStatus,
                  msg: 'Auth successfully added'});
  
    } catch(e){
      console.log(`API error @ db add auth: ${e.message}`)
      res.status(400).json({
        msg: e.message,
        error: true
      })
    }
  };

  const getCurrency = async (req, res) => {
    try {
        const currency = req.params.currency
        let array = currency.split('+')
        let ticker = array[0]
        let issuer = array[1]

        let record = await mongo.query('currencies', {
          currency:ticker,
          issuer: issuer
          }
        )
  
        if (record[0]) {
          res.send({data: record[0],
                    msg: 'Currency found in database'});
        } else { 
          res.send({data: null,
                    msg: 'Currency not found in database'});
        }
  
    } catch(e) { 
      console.log(`API error @ db query: ${e.message}`)
        res.status(400).json({
          msg: e.message,
          error: true
        })
    }
  };
  
module.exports = {
                search,
                query,
                removeUser,
                updateUser,
                addUser,
                getUser,
                deleteUser,
                authUser,
                authAdd,
                authChange,
                getCurrency
            }