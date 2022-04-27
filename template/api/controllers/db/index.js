const mongo = require('../../scripts/mongo.js');
  
const query = async (req, res) => {
    try {
        let record = await mongo.findAll('col')
  
        if (record[0]) {
          res.send({data: record,
                    msg: 'Index found in database'});
        } else { 
          res.send({data: null,
                    msg: 'Index not found in database'});
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
                query
            }