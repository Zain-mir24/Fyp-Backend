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
router.post('/add', function(req, res, next) {
  res.send('this is the mainpage');
  const fname=req.body.Firstname
  const lname=req.body.Lastname
  const email=req.body.Email
  const password=req.body.Password
  console.log(req.body)
  connection.query("INSERT INTO `signup`(`Firstname`, `Lastname`, `Email`, `Password`) VALUES (?,?,?,?)",[fname,lname,email,password],function(error,rows,field){
    if(!!error){
        console.log('Error in  the query')
    }
    else{
     console.log('successful query')
    }
 })
});


  
module.exports = router;
