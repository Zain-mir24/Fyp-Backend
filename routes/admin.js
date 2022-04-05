const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();
// const path = require("path");
const Campaign = require("../models/CampaignDB");
const adminAuth = require("../middleware/adminAuth");
const Admin = require("../models/Admin");
const User = require("../models/users");
const Category = require("../models/Category");

const mongoose = require("../db/mongoose");
const News = require("../models/LatestNewsDB");
const upload = require("../middleware/img").upload;
const Appeal = require("../models/appealedCampaign");
const AppealLoan = require("../models/appealedLoans");
const adminController = require("../controllers/AdminController");

// const { response } = require("express");

//Admin routes

// });
// Post route
router.post("/SuperAdmin", adminController.SuperAdmin);
router.post("/login", adminController.login);
//logout route for the user
//post route for the user
router.post("/logout", adminAuth, adminController.logout);
// adding admin
router.post("/changepassword", adminController.changePassword);
//reading the users
router.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.send("Error found");
  }
});
router.get("/readBeneficiary", adminController.readBeneficiary);
//updating the user in the database
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(req.body);
  console.log(updates);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    console.log("error", e);
    res.status(400).send(e);
  }
});

//deleting user from the database
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id }); //checking if id is in the database

    if (!user) {
      res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//Adding campaigns
router.post(
  "/addCampaign",
  adminAuth,
  upload.single("file"),
  async (req, res) => {
    const campaign = new Campaign(req.body);
    console.log(req.body, "Coming from the frontend");
    try {
      await campaign.save();
      res.status(201).send("campaign added");
    } catch (e) {
      console.log(e);
      res.status(401);
    }
  }
);

// View created campaigns

router.get("/viewCampaigns", async (req, res) => {
  try {
    const campaign = await Campaign.find({});
    if (!campaign) {
      res.status(401).send();
    }

    res.status(200).send({ campaign });
  } catch (e) {
    console.log(e);
  }
});

// Delete campaigns
router.delete("/Deletecampaign/:_id", adminAuth, async (req, res) => {
  const campaign = await Campaign.findByIdAndDelete({ _id: req.params._id });
  try {
    if (!campaign) {
      res.status(401).send();
    }
    res.send(campaign);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update campaigns
router.patch(
  "/updateCampaign/:_id",
  upload.single("file"),
  async (req, res) => {
    console.log(req.body, "Body coming from frontend");
    const campaign = await Campaign.findByIdAndUpdate(
      { _id: req.params._id },
      req.body
    );
    try {
      if (!campaign) {
        throw new Error("Campaign with that does not exist");
      }
      res.status(200).send(campaign);
      console.log(campaign);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);
//View campaigns appealed
router.get("/viewcampaignAppeals", async (req, res) => {
  try {
    const appeal = await Appeal.find({});
    var ids = appeal.map((i) => i.bid);
    console.log(ids);
    const beneficiary = await User.find({
      _id: {
        $in: ids,
      },
    }).exec();

    if (!appeal) return Error;
    res.status(200).send({ appeal, beneficiary });
    console.log(appeal);
  } catch (e) {
    res.status(500).send(e);
  }
});
// Loan Section
// View latest Loan Apeeals
router.get("/viewLoanAppeals", async (req, res, next) => {
  try {
    await AppealLoan.find({})
      .populate("bid")
      .exec((error, result) => {
        if (error) {
          return next(error);
        }
        console.log(result);
        res.status(200).send(result);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

// UPDATE LOAN STATUS

router.patch("/updateLoan/:id", async (req, res, next) => {
  try {
    const add = await AppealLoan.findByIdAndUpdate(
      { _id: req.params.id },
      { status: req.body.status },
      (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          res.send(resp);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

//Latest news section

//Reading the news data
router.get("/LatestNews", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (e) {
    console.log("errorrrr", e);
  }
});
router.get("/LatestNews/:id", async (req, res) => {
  try {
    const news = await News.find({ category: req.params.id });
    res.json(news);
  } catch (e) {
    console.log("errorrrr", e);
  }
});
//  delete news using id

router.delete("/deleteNews/:_id", async (req, res) => {
  try {
    await News.findOneAndDelete({ _id: req.params._id }).then((response) => {
      res.status(200).send(response);
    });
  } catch (e) {
    log;
  }
});
router.patch("/updateNews/:_id", async (req, res) => {
  try {
    News.findOneAndUpdate({ _id: req.params._id }, req.body);
  } catch (e) {
    console.log(e);
  }
});

//Addnews
router.post("/addNews", upload.single("file"), async (req, res) => {
  var obj = {
    name: req.body.name,
    description: req.body.description,
    file: req.body.fileName,
    category: req.body.category,
  };
  const news = new News(obj);
  try {
    await news.save();
    res.status(201).send("Latest News added");
  } catch (e) {
    console.log(e);
    res.status(401);
  }
});
router.post("/addCategory", async (req, res) => {
  try {
    await Category.create(req.body).then((response) => {
      res.status(201).send(response);
    });
  } catch (e) {
    console.log(e);
    res.status(401);
  }
});
router.get("/sendCategory", async (req, res) => {
  Category.find().then(async (response) => {
    await res.send(response);
  });
});
router.get("/sendcategory/:id", async (req, res) => {
  Category.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(300).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});
router.delete("/deleteCategory/:id", async (req, res) => {
  Category.findByIdAndDelete({ _id: req.params.id }, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.send(response);
    }
  });
});

// Adopting Children
router.post("/addchild", upload.single("file"), adminController.addChild);
router.patch(
  "/updatechild/:cid",
  upload.single("file"),
  adminController.updateChild
);
router.get("/viewChildren", adminController.viewChildren);
router.delete("/deleteChildren/:cid", adminController.deleteChildren);
router.get("/viewChild/:cid", adminController.specificChild);
// Donation details through each campaign and donor name with each donation
// Populating donors id
router.get("/Donations", adminController.donationDetails);
// loan management routes adding loan,updating ,deleting and viewing appeals
router.patch("/approveLoanupdate/:Lid", adminController.updateLoanApproved);
router.delete("/approveLoandelete/:Lid", adminController.deleteLoanApproved);
router.get("/approveLoanview", adminController.viewLoanApproved);
// SubAdmin Management Routes
// router.post("/addingAdmin ", adminController.addAdmin);
router.post("/SubAdminadd", adminController.addsubAdmin);
router.patch("/updatesubAdmin/:Sid", adminController.updatesubAdmin);
router.delete("/deletesubAdmin/:Sid", adminController.deletesubAdmin);
router.get("/viewsubAdmin", adminController.viewsubAdmin);
// View monthly support Appeals from beneficiary
router.get("/viewmonthlyAppeal", adminController.viewmonthlyAppeal);
//  Add amount detail routes for admin
router.post("/addAmountDetail", adminController.addamountDetail);
// View amount detail for the beneficiary.
router.get("/viewamountDetail", adminController.viewammountDetail);
// Housing Scheme for beneficiary
router.post("/addhousingScheme", upload.single("images"), adminController.addHousingScheme);
// Update Housing Scheme from Admin Panel
router.patch("/updatehousingscheme/:id", adminController.updateHousingScheme);
// viewing all the scheme for beneficiary
router.get("/viewhousingscheme", adminController.viewHousingScheme);
// Estimation performa route for admin
router.post("/addEstimation", adminController.addEstimation);
router.get("/viewEstimation", adminController.viewEstimation);
// Daily Expenses Sheet
router.get("/viewExpense", adminController.viewExpense);
router.post("/addExpense", adminController.addExpense);
// Masjid donation by donor scehma
router.post("/masjidDonation", adminController.addMasjid);
router.get("/masjidDonation", adminController.viewMasjid);
// Rickshaw recovery scheme
router.post("/addRickshawScheme", adminController.addRickshaw);
router.get("/viewRickshawdetail/:id", adminController.viewDonorRickshawDetail);
router.get("/viewRickshawdetail", adminController.viewRickshawDetail);
// Ahmed routes of cow details
router.get("/donor", adminController.getDonor);
router.get("/viewCowDetail", adminController.viewCowDetail);
router.get("/viewDonorCowDetail/:id", adminController.viewDonorCowDetail);
router.post("/addCowDetail", adminController.addCowDetail);
// Super Admin Audit routes
router.post("/createAudit", adminController.CreateAuditTeam);
router.patch("/updateTeam/:id", adminController.updateAuditTeam);
router.get("/viewAudits", adminController.viewAudit);

// subAdmin routes
router.post("/UploadReport", upload.single("file"), adminController.uploadReport)

module.exports = router;
