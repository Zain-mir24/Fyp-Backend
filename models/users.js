let query = require("../libs/sql");
 const findUser=(async(req,res)=>{
    const Id=req.body.id
    const ifEmail = await query(
        `SELECT id,firstname,lastname,email,password FROM signup WHERE id = "${Id}"`
      );
})
module.exports =findUser