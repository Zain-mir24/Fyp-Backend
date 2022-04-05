const children = require("../models/Children");
const User = require("../models/users");
const Donation = require("../models/Donation");
const appeal = require("../models/appealedCampaign");
const Admin = require("../models/Admin");
const Monthly = require("../models/MonthlySupport");
const Amount = require("../models/AmountDetail");
const Housing = require("../models/HousingScheme");
const Estimation = require("../models/Estimationperforma");
const Expense = require("../models/DailyExpense");
const Masjid = require("../models/Masjid");
const Recovery = require("../models/Recovery")
const Cow = require("../models/Cow");
const Audit = require("../models/Audit")
// Read beneficiaries
const readBeneficiary = async (req, res, next) => {
  try {
    const user = await User.find({ userType: "beneficiary" });
    res.send(user);
  } catch (e) {
    res.send("Error found");
  }
};

// Admin signup routes and addition of admins
const SuperAdmin = async (req, res, next) => {
  const { email } = req.body;
  const matchEmail = await Admin.findOne({ email });
  try {
    if (!matchEmail) {
      const add = await Admin.create(req.body);
      res.status(201).send(add);
    } else {
      res.send("ALready existing email");
    }
  } catch (e) {
    console.log("errrorr", e);
    next(e);
    res.status(400).send(e);
  }
};
const login = async (req, res, next) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.getEmail,
      req.body.getPassword
    );

    const token = await admin.generateAuthToken();
    if (!admin) {
      res.send("not found");
    }
    console.log(admin);
    console.log("tokeeen", token);
    res.status(200).send({ admin, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.Admin.save();
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

// routes for adding
const addsubAdmin = async (req, res, next) => {
  const { email } = req.body;
  const matchEmail = await Admin.findOne({ email });
  try {
    if (!matchEmail) {
      const add = await Admin.create(req.body);
      res.status(201).send(add);
    } else {
      res.status(203).send("ALready existing email");
    }
  } catch (e) {
    console.log("errrorr", e);
    next(e);
    res.status(400).send(e);
  }
};
const updatesubAdmin = async (req, res, next) => {
  try {
    const done = await Admin.findByIdAndUpdate(
      { _id: req.params.Sid },
      req.body
    );
    res.status(201).send(done);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
const deletesubAdmin = async (req, res, next) => {
  try {
    const done = await Admin.findByIdAndDelete({ _id: req.params.Sid });
    res.status(200).send(done);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
const viewsubAdmin = async (req, res, next) => {
  try {
    await Admin.find({ subAdmin: true }).exec((error, result) => {
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
// change password
const changePassword = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).send("user with given email does not exist");
    }
    admin.password = req.body.newpass;
    await admin.save();
    return res.status(201).send("admin's password has been changeds");
  } catch (e) {
    console.log("Couldnt change the password", e);
  }
};
// Adding Children data to database
const addChild = async (req, res, next) => {
  const myChild = new children(req.body);
  console.log(myChild, "child's data coming from the frontend");
  try {
    await myChild.save();
    // const done = await children.create(req.body);
    res.status(200).send("child added");
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
    const add = await appealed.save(req.body);
    if (!add) {
      res.status(500).send("error in adding");
    }
    res.status(200).send(add);
  } catch (e) {
    res.status(500).send(e);
  }
};
// update loan
const updateLoanApproved = async (req, res, next) => {
  try {
    const add = await appealed.findByIdAndUpdate(
      { _id: req.params.Lid },
      req.body
    );
    if (!add) {
      res.status(501).send("error in adding");
    } else res.status(200).send(add);
  } catch (e) {
    res.status(500).send(e);
  }
};
// view Loan approved
const viewLoanApproved = async (req, res, next) => {
  try {
    const add = await appealed.find({});
    if (!add) {
      res.status(501).send("error in adding");
    } else res.status(200).send(add);
  } catch (e) {
    res.status(500).send(e);
  }
};
// delete loans
const deleteLoanApproved = async (req, res, next) => {
  try {
    const done = await appealed.findByIdAndDelete({ _id: req.params.Lid });
    res.status(200).send(done);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
// view monthly support of beneficiary
const viewmonthlyAppeal = async (req, res, next) => {
  try {
    const viewAppeal = await Monthly.find({}).populate("bid");
    console.log(viewAppeal, "view");
    res.status(200).send(viewAppeal);
  } catch (e) {
    res.status(500).send(e);
  }
};
// Adding amount detail for  beneficiary
const addamountDetail = async (req, res, next) => {
  console.log(req.body);
  try {
    const Amountdetail = await Amount.create(req.body);
    res.status(200).send(Amountdetail);
  } catch (e) {
    res.status(500).send(e);
  }
};
// viewing amount detail from each beneficiary
const viewammountDetail = async (req, res, next) => {
  try {
    const view = await Amount.find({}).populate("bid");
    res.status(200).send(view);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

// Adding housing Scheme for beneficiary
const addHousingScheme = async (req, res, next) => {
  try {
    console.log(JSON.parse(req.body.family), "HELLO");
    const add = await Housing.create({
      Deservername: req.body.Deservername,
      Guardian: req.body.Guardian,
      Status: req.body.Status,
      cnic: req.body.cnic,
      cell: req.body.cell,
      Dependents: req.body.Dependents,
      Sourceofincome: req.body.Sourceofincome,
      Monthlyincome: req.body.Monthlyincome,
      address: req.body.address,
      accomodationself: req.body.accomodationself,
      accomodationdonated: req.body.accomodationdonated,
      accomodationrental: req.body.accomodationrental,
      ownerofland: req.body.ownerofland,
      PlotDimensions: req.body.PlotDimensions,
      EstimatedCost: req.body.EstimatedCost,
      EstimatedTimeFrame: req.body.EstimatedTimeFrame,
      contructionDetail: req.body.contructionDetail,
      images: req.body.fileName,
      family: JSON.parse(req.body.family),
    });
    if (!add) {
      throw new Error("this format is wrong my man");
    }
    res.status(200).send(add);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
// viewing housing Scheme for beneficiary
const viewHousingScheme = async (req, res, next) => {
  try {
    const view = await Housing.find({});
    if (!view) {
      throw new Error("this format is wrong my man");
    }
    res.status(200).send(view);
  } catch (e) {
    res.status(500).send(e);
  }
};
// UPDATE HOUSING SCHEME
const updateHousingScheme = async (req, res, next) => {
  try {
    console.log(req.body);
    const view = await Housing.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ProposalNo: req.body.ProposalNo,
        needs: req.body.needs,
        outcomes: req.body.outcomes,
        communicationFeedback: req.body.communicationFeedback,
      }
    );
    if (!view) {
      throw new Error("this format is wrong my man");
    }
    res.status(200).send(view);
  } catch (e) {
    res.status(500).send(e);
  }
};
const addEstimation = async (req, res, next) => {
  try {

    const add = await Estimation.create(
      {
        Project: req.body.project,
        Location: req.body.location,
        Caretaker: req.body.caretaker,
        Cellno: req.body.cellno,
        Date: req.body.Date,
        Material: req.body.Material,
        Masoncharges: req.body.Masoncharges,
        Labourcharges: req.body.Labourcharges,
        Electriciancharges: req.body.Electriciancharges,
        Plumbercharges: req.body.Plumbercharges,
        Shutteringcharges: req.body.Shutteringcharges,
        Paintercharges: req.body.Paintercharges,
        Total: req.body.Total,
      },
      (res, err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      }
    );
    console.log(add);
  } catch (e) {
    res.status(500).send(e);
  }
};
const viewEstimation = async (req, res, next) => {
  try {
    const view = await Estimation.find({});
    if (!view) {
      throw new Error("this format is wrong my man");
    }
    res.status(200).send(view);
  } catch (e) {
    console.log(e);
  }
};
const addExpense = async (req, res, next) => {
  try {
    const add = await Expense.create(req.body);
    if (!add) {
      throw new Error("this format is wrong");
    }
    res.status(200).send(add);
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
};
const viewExpense = async (req, res, next) => {
  try {
    const view = await Expense.find({});
    if (!view) {
      throw new Error("this format is wrong");
    }
    res.status(200).send(view);
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
};
// Adding masijid donation in this schema
const addMasjid = async (req, res, next) => {
  try {
    console.log(req.body, "print data");
    const add = await Masjid.findOneAndUpdate(
      { Uid: req.body.Uid },
      {
        $push: {
          Donation: [
            {
              Date: req.body.Date,
              credited: req.body.credited,
              debited: req.body.debited,
              balance: req.body.balance,
              Remarks: req.body.Remarks,
            },
          ],
        },
      }
    );
    if (add) {
      console.log(add, "Pushing data to already existing person");
      res.status(200).send(add);
    }
    if (!add) {
      const newEntry = await Masjid.create({
        Uid: req.body.Uid,
        Donation: {
          Date: req.body.Date,
          credited: req.body.credited,
          debited: req.body.debited,
          balance: req.body.balance,
          Remarks: req.body.Remarks,
        },
      });
      console.log(newEntry, "Entring new Data");
      res.status(200).send(newEntry);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
const viewMasjid = async (req, res, next) => {
  try {
    const view = await Masjid.find({}).populate("Uid");
    console.log(view, "Masjid Data");
    res.status(200).send(view);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
const getDonor = async (req, res, next) => {
  try {
    const view = await User.find({ userType: "donor" });
    console.log(view, "Masjid Data");
    res.status(200).send(view);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
const addCowDetail = async (req, res, next) => {
  try {
    const add = await Cow.create(req.body);
    if (!add) {
      throw new Error("this format is wrong");
    }
    res.status(200).send(add);
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
};
const viewCowDetail = async (req, res, next) => {
  try {
    const view = await Cow.find({}).populate("Uid");
    console.log(view, "Cow Data");
    res.status(200).send(view);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
// Cow donation details
const viewDonorCowDetail = async (req, res, next) => {
  try {
    const view = await Cow.find({ Uid: req.params.id });
    console.log(view, "Cow Data");
    res.status(200).send(view);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
// Adding rickshaw scheme
const addRickshaw = async (req, res, next) => {
  try {
    console.log(req.body, "print data")
    const add = await Recovery.findOneAndUpdate(
      { Uid: req.body.Uid },
      {
        name: req.body.name,
        cell: req.body.cell,
        DateofPurchase: req.body.DateofPurchase,
        Installment: req.body.Installment,
        TotalAmount: req.body.TotalAmount,
        $push: {
          Recovery: [{
            Month: req.body.Month,
            amount: req.body.amount,
            balance: req.body.balance,
          }]
        }
      }
    )
    if (add) {
      console.log(add, "Pushing data to already existing person")
      res.status(200).send(add)
    }
    if (!add) {
      const newEntry = await Recovery.create(
        {
          Uid: req.body.Uid,
          name: req.body.name,
          cell: req.body.cell,
          DateofPurchase: req.body.DateofPurchase,
          Installment: req.body.Installment,
          TotalAmount: req.body.TotalAmount,
          Recovery: {
            Month: req.body.Month,
            amount: req.body.amount,
            balance: req.body.balance,
          }
        }
      )
      console.log(newEntry, "Entring new Data")
      res.status(200).send(newEntry)
    }
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}
const viewDonorRickshawDetail = async (req, res, next) => {
  try {
    const view = await Recovery.find({ Uid: req.params.id });
    console.log(view, "Rickshaw Donor Data");
    res.status(200).send(view);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
const viewRickshawDetail = async (req, res, next) => {
  try {
    const view = await Recovery.find({}).populate("Uid");
    console.log(view, "Rickshaw Data");
    res.status(200).send(view);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

const CreateAuditTeam = async (req, res, next) => {
  try {
    const add = await Audit.create({
      auditTeamname: req.body.auditTeamname,
      subAdmins: {
        Sid: req.body.Sid,
        Sid2: req.body.Sid2,
        Sid3: req.body.Sid3,
      },

      Cid: req.body.Cid,
    })
    console.log(add, "Create Audit")
    res.status(200).send(add)
  } catch (e) {
    res.status(500).send(e)
  }
}

const updateAuditTeam = async (req, res, next) => {
  try {
    const add = await Audit.findByIdAndUpdate({ _id: req.body._id }, {
      auditTeamname: req.body.auditTeamname,
      subAdmins: {
        Sid: req.body.Sid,
        Sid2: req.body.Sid2,
        Sid3: req.body.Sid3,
      },
      Cid: req.body.Cid


    })
    console.log(add, "Create Audit")
    res.status(200).send(add)
  } catch (e) {
    res.status(500).send(e)
  }
}

const viewAudit = async (req, res, next) => {
  try {
    const view = await Audit.find({}).populate(["subAdmins.Sid", "subAdmins.Sid2", "subAdmins.Sid3"])
    res.status(200).send(view)
  }
  catch (e) {
    res.status(500).send(e)
    console.log(e)
  }
}
// subadmin functions will be here at this point
const uploadReport = async (req, res, next) => {
  try {
    const upload = await Audit.findByIdAndUpdate(
      {
        _id: req.body._id
      },
      {
        fileName: req.body.fileName
      })
    res.status(200).send(upload)
  }
  catch (e) {
    res.status(500).send(e)
  }
}

module.exports = {
  CreateAuditTeam,
  updateAuditTeam,
  viewAudit,
  uploadReport,
  viewRickshawDetail,
  viewDonorRickshawDetail,
  addRickshaw,
  viewDonorCowDetail,
  viewCowDetail,
  addCowDetail,
  getDonor,
  addMasjid,
  viewMasjid,
  readBeneficiary,
  addHousingScheme,
  addExpense,
  viewExpense,
  addEstimation,
  viewEstimation,
  viewHousingScheme,
  viewammountDetail,
  addamountDetail,
  viewmonthlyAppeal,
  addsubAdmin,
  updatesubAdmin,
  deletesubAdmin,
  viewsubAdmin,
  SuperAdmin,
  login,
  logout,
  changePassword,
  addChild,
  updateChild,
  viewChildren,
  deleteChildren,
  specificChild,
  donationDetails,
  addLoanApproved,
  updateLoanApproved,
  viewLoanApproved,
  deleteLoanApproved,
  updateHousingScheme,
};
