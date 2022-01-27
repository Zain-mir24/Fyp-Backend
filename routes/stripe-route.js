const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();
const stripe =  require("stripe")("sk_test_51KM9Y3ExITDpmfWaTBQKzP1vOnJIGSBLZUCx89aytpdX1RulXmuV6ZLYrkIijroY0YAFAwhi2xV5Yn1MHZinXwxs00q9ALOaSR")
const uuid = require("uuid/v4")
// const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
router.post("/pay",(req,res,next)=>{
    console.log(req.body.token);
    const {token,amount} = req.body;
    const idempotencyKey=uuidv4();
    return stripe.customers.create({
        email:token.email,
        source:token
    }).then(customer=>{
      stripe.charges.create({
          amount:amount*100,
          currency:'usd',
          customer:customer.id,
          receipt_email:token.email,
          description:`Donation to ${campaign.campaignname}`
      },{idempotencyKey})
      }).then(result=>{
          res.status(200).send(result)
      }).catch(err=>{
          console.log(err)
      })
    })
