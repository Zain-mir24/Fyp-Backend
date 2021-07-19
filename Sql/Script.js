var express = require("express");
const mysql = require("mysql");
var app=express();
var connection = mysql.createConnection({
    //properties
    host:'localhost',
    user:'root',
    password:'',
    database:'GlobalReach'

})
connection.connect(function(error){
    if(!error){
        console.log('Error')
    }
    else{
        console.log('Connected')
    }
})


app.get('/',function(req,resp){
    //about mysql 
    // where we will put sql query

 
    connection.query("SELECT * FROM GlobalReach",function(error,rows,field){
       if(!!error){
           console.log('Error in  the query')
       }
       else{
        console.log('successful query')
       }
    })
}) 
    
app.listen(1337)