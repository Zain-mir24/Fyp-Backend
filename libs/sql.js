const mysql = require("mysql");
const util = require('util');
let db = mysql.createConnection({
    //properties
    host: "localhost",
    user: "root",
    password: "",
    database: "globalreach",
  });
  const query = util.promisify(db.query).bind(db);
  console.log("connected", query);
   module.exports=query