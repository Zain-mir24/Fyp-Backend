const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
          if(err) return res.sendStatus(401)
          req.user=user
          next()
        })
        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
  
        // if (!user) {
        //     throw new Error()
        // }
  
        // req.token = token
        // req.user = user
       
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
  }

module.exports = auth