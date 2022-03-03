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
  try {
    const newAppeal = await Monthly.create(req.body)
    if (!newAppeal) {
      next("error while creating the appeal")
    }
    res.status(200).send(newAppeal)

  }
  catch (e) {
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
  monthlyAppeal,
  viewAppeal
  // scheduleMeeting
};
