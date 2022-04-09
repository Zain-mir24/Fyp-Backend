const Monthly = require("../models/MonthlySupport");
const children = require("../models/Children");
const Audit = require("../models/Audit")


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
};
const monthlyAppeal = async (req, res, next) => {
  console.log(req.body.bid);
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
    accomodationself: req.body.self,
    accomodationdonated: req.body.donated,
    accomodationrental: req.body.rental,
    accomodationrent: req.body.rent,
    widowfamdetail: JSON.parse(req.body.widowfamdetail).map((i) => ({
      name: i.name,
      age: i.age,
      relation: i.relation,
      activities: i.activities,
      income: i.income,
    })),
    widowsibilings: JSON.parse(req.body.widowsibilings).map((i) => ({
      name: i.name,
      age: i.age,
      relation: i.relation,
      activities: i.activities,
      income: i.income,
    })),
    medicineCost: req.body.medicineCost,

    bformname: req.body.bformname,

    deathcertificatename: req.body.deathcertificatename,
    totalamountdonation: req.body.totalamountdonation,
  };
  try {
    const newAppeal = await Monthly.create(obj);
    if (!newAppeal) {
      next("error while creating the appeal");
    }
    console.log(newAppeal);
    res.status(200).send(newAppeal);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
const SpecificAudit = async (req, res, next) => {
  try {
    console.log(req.params.cid)
    const find = await Audit.findOne({
      Cid: req.params.cid
    })
    res.status(200).send(find)
    console.log(find)

  } catch (e) {
    console.log(e)
    res.status(500).send(e)

  }
}
module.exports = {
  viewChildren,
  monthlyAppeal,
  SpecificAudit
  // viewAppeal
  // scheduleMeeting
};
