const children = require("../models/Children");

const addChild = async (req, res, next) => {
  try {
    const done = await children.create(req.body);
    res.status(200).send(done);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
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
const viewChildren = async (req, res, next) => {
  try {
    const done = await children.find({});
    res.status(200).send(done);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
const deleteChildren=async(req,res,next)=>{
try{
const done=await children.findByIdAndDelete({_id:req.params.cid})
res.status(200).send(done)
}
catch(e){
  console.log(e);
  res.status(500).send(e);
}

}
module.exports = {
  addChild,
  updateChild,
  viewChildren,
  deleteChildren
};
