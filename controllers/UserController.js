const Monthly = require("../models/MonthlySupport")
const children = require("../models/Children");


const viewChildren = async (req, res, next) => {
  try {
    await children.find({}).exec((error, result) => {
      console.log("result", result);
      res.status(200).send(result);
      if (error) {
        console.log(error);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
const monthlyAppeal = async (req, res, next) => {
  var obj = {
    bid: req.body.bid,
    phoneNumber: req.body.phoneNumber,
    cnic: req.body.cnic,
    category: req.body.category,
    Sourceofincome: req.body.Sourceofincome,
    presentAddress: req.body.presentAddress,
    Totalincome: req.body.Totalincome,
    Totalexpenses: req.body.Totalexpenses,
    NativeTown: req.body.NativeTown,
    Accomodation: {
      self: req.body.self,
      donated: req.body.Accomodation.donated,
      rental: req.body.Accomodation.rental,
      rent: req.body.Accomodation.rent,
    },
    widowfamdetail: [
      {
        name: req.body.widowfamdetail[0].name,
        age: req.body.widowfamdetail[0].age,
        relation: req.body.widowfamdetail[0].relation,
        activities: req.body.widowfamdetail[0].activities,
        income: req.body.widowfamdetail[0].income,
      },
    ],
    widowsibilings: [
      {
        name: req.body.widowsibilings[0].name,
        age: req.body.widowsibilings[0].age,
        relation: req.body.widowsibilings[0].relation,
        activities: req.body.widowsibilings[0].activities,
        income: req.body.widowsibilings[0].income,
      },
    ],
    medicineCost: req.body.medicineCost,

    bformname: req.body.bformname,

    deathcertificatename: req.body.deathcertificatename,
    totalamountdonation: req.body.totalamountdonation,
  }
  try {
    const newAppeal = await Monthly.create(obj)
    if (!newAppeal) {
      next("error while creating the appeal")
    }
    console.log(newAppeal)
    res.status(200).send(newAppeal)

  }
  catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}
// const viewAppeal = async (req, res, next) => {
//   try {
//     const viewAppeal = await Monthly.find({}).populate("bid")
//     res.status(200).send(viewAppeal)
//   }
//   catch (e) {
//     res.status(500).send(e)

//   }
// }
module.exports = {
  viewChildren,
  monthlyAppeal
  // viewAppeal
  // scheduleMeeting
};
