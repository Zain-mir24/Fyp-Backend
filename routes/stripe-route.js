const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Donation = require("../models/Donation");
// const uuid = require("uuid/v4")
// const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
router.post("/pay", async (req, res, next) => {
  console.log("my token", req.body);
  const { token, amount, campaign, campaignId } = req.body;
  const idempotencyKey = uuidv4();
  const body = {
    campaignid: campaignId,
    amount,
  };
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: amount * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Donation to ${campaign.name}`,
        },
        { idempotencyKey }
      );
    })
    .then(async (result) => {
      try {
        console.log(req.body.campaignId)
      const searchandadd=  await Donation.updateOne({campaignid:req.body.campaignId},{$inc:{
        amount:req.body.amount
      }})
      if(!searchandadd){
        const donate = await Donation.create(body);
        console.log(donate);
        console.log("Charged successfully");
        res.status(200).send(result);
      }
      console.log("Already existing amount updated")
      res.status(200).send(result)
      
      } catch (e) {
        console.log(e);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
