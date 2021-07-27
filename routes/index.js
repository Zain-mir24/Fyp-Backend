var express = require('express');
var router = express.Router();
const mysql = require("mysql");
var connection = mysql.createConnection({
  //properties
  host:'localhost',
  user:'root',
  password:'',
  database:'globalreach'

})
connection.connect(function(error){
  if(!error){
      console.log('Error')
  }
  else{
      console.log('Connected')
  }
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  connection.query("SELECT * FROM `signup` WHERE 1",function(error,rows,field){
    if(!!error){
        console.log('Error in  the query')
    }
    else{
     console.log('successful query')
    }
 })
});


  
module.exports = router;
