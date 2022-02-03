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
  const { token, amount, name, campaignId, userId } = req.body;
  const idempotencyKey = uuidv4();
  const body = {
    campaignid: campaignId,
    name,
    amount,
    userId,
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
          currency: "pkr",
          customer: customer.id,
          receipt_email: token.email,
          description: `Donation to ${name}`,
        },
        { idempotencyKey }
      );
    })
    .then(async (result) => {
      try {
        if (req.body.userId == null) {
          try {
            const searchandadd = await Donation.findOneAndUpdate(
              { campaignid: req.body.campaignId },
              {
                $push: {
                  anonymousUser: {
                    email: req.body.token.email,
                    donation: req.body.amount,
                  },
                },
                $inc: {
                  totalamount: req.body.amount,
                },
              }
            );
            res.status(200).send(searchandadd)
            console.log("success")
            if (!searchandadd) {
              try {
                const donate = await Donation.create({
                  campaignid: req.body.campaignId,
                  campaignname: req.body.name,

                  anonymousUser: {
                    email: req.body.token.email,
                    donation: req.body.amount,
                  },

                  totalamount: req.body.amount,
                });
                if (donate) {
                  console.log(donate);
                  console.log(
                    "new entery addded for anonymous Charged successfully"
                  );
                  res.status(200).send(result);
                }
              } catch (e) {
                console.log("error in inserting new anonymous data", e);
              }
            }
          } catch (e) {
            console.log("error", e);
          }
        } else {
          const searchandadd = await Donation.findOneAndUpdate(
            { campaignid: req.body.campaignId },
            {
              $push: {
                registeredUser: {
                  userId: req.body.userId,
                  donation: req.body.amount,
                },
              },
              $inc: {
                totalamount: req.body.amount,
              },
            }
          );
          if (!searchandadd) {
            const donate = await Donation.create(body);
            console.log(donate);
            console.log("Charged successfully");
            res.status(200).send(result);
          }
          console.log("Already existing amount updated");
          res.status(200).send(result);
        }
      } catch (e) {
        console.log(e);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
