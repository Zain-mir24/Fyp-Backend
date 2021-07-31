let express = require("express");
let router = express.Router();
let query = require("../libs/sql");

/* POST Signup */
router.post("/add", async function (req, res, next) {
  //getting data from input fields
  const Firstname = req.body.Firstname;
  const Lastname = req.body.Lastname;
  const Email = req.body.Email;
  const Password = req.body.Password;

  //query for selection email

  //if not then enter the data into the database
  
    query('SELECT COUNT(*) AS cnt FROM signup WHERE Email ="' + Email + '"',function(err,data){
      if(err){
        console.log(err);
    }   
    else{
        if(data[0].cnt > 0){  
              res.send("Already exist")
        }else{
          query(
            "INSERT INTO signup (Firstname, Lastname, Email, Password) VALUES (?,?,?,?)",
            [Firstname, Lastname, Email, Password]
          )
            .then((val) => {
              console.log("val", val);
              return res.status(200).json({ body: val });
            })
            .catch((err) => {
              console.log("err", err);
              return res.status(400).json({ body: err });
            });

 
  }
}

  
  
});
})
router.post("/search", function (req, res, err, result) {
  res.send({ type: "post" });
  // const Email = req.body.Email;
  // query(
  //   'SELECT Email FROM signup WHERE Email ="' + Email + '"' //checks if email already exist
  // )
  //   .then(() => {
  //     return res.status(200).send(result)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(400).json({ body: err });
  //   });
});

module.exports = router;
