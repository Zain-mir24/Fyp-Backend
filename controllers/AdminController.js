const children = require("../models/Children");
const User = require("../models/users");
const Donation = require("../models/Donation");
const approve = require("../models/approvedloans");
// Adding Children data to database
const addChild = async (req, res, next) => {
  try {
    const done = await children.create(req.body);
    res.status(200).send(done);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
// Updating children database
const updateChild = async (req, res, next) => {
  try {
    const done = await children.findByIdAndUpdate(
      { _id: req.params.cid },
      req.body
    );
    res.status(201).send(done);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
// Viewing children database
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
// Deleting children database
const deleteChildren = async (req, res, next) => {
  try {
    const done = await children.findByIdAndDelete({ _id: req.params.cid });
    res.status(200).send(done);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
// Viewing specific child
const specificChild = async (req, res, next) => {
  try {
    const done = await children.findById({ _id: req.params.cid });
    res.status(200).send(done);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
// View Donations for each campaign  and users name and email
const donationDetails = async (req, res, next) => {
  try {
    await Donation.find({})
      .populate("registeredUser.userId")
      .exec((error, result) => {
        if (error) {
          return next(error);
        }
        res.json(result);
      });
  } catch (e) {
    res.status(500).send(e);
  }
};
// loan managment controllers
const addLoanApproved = async (req, res, next) => {
  try {
    const add = await approve.save(req.body);
    if (!add) {
      res.status(500).send("error in adding");
    }
    res.status(200).send(add);
  } catch (e) {
    res.status(500).send(e);
  }
};
// update loan
const updateLoanApproved=async(req,res,next)=>{
  try {
    const add = await approve.findByIdAndUpdate(  { _id: req.params.Lid },
      req.body);
    if (!add) {
      res.status(501).send("error in adding");
    }
    else res.status(200).send(add);
  } catch (e) {
    res.status(500).send(e);
  }
}
// view Loan approved
const viewLoanApproved=async(req,res,next)=>{
  try {
    const add = await approve.find({});
    if (!add) {
      res.status(501).send("error in adding");
    }
    else res.status(200).send(add);
  } catch (e) {
    res.status(500).send(e);
  }
}
// delete loans
const deleteLoanApproved=async(req,res,next)=>{
  try {
    const done = await approve.findByIdAndDelete({ _id: req.params.Lid });
    res.status(200).send(done);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
module.exports = {
  addChild,
  updateChild,
  viewChildren,
  deleteChildren,
  specificChild,
  donationDetails,
  addLoanApproved,
  updateLoanApproved,
  viewLoanApproved,
  deleteLoanApproved
};
