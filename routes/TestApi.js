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

  console.log(Email);


  //query for selection email
  query(
    'SELECT * FROM signup WHERE Email ="' + Email + '"', //checks if email already exist
    function (err, result) {
      if (result) {
        //if it does return that email already exist
        console.log("Already Exist");
      } else {
        // if not then enter the data into the databas
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
  );
});
router.get("/search", function (req, res, err, result) {
  const Email = req.body.Email;
  query(
    'SELECT Email FROM signup WHERE Email ="' + Email + '"' //checks if email already exist
  )
    .then((val) => {
      console.log("val", val);
      return res.status(200).json({ body: val });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ body: err });
    });
});

module.exports = router;
