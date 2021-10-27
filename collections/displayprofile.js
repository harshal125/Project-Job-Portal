// require detabase
const jwt = require("jsonwebtoken");   
// require("../db/conn");
const queschema = require("../models/profileSchema");
// const regiterschema = require("../models/registerschema");


// To feach deta from the detabse
module.exports = async (req, res) => {
  console.log("hiii")
  
  try{

    console.log(req.params.id)

    const ques = await queschema.findOne({registerId : req.params.id});
    console.log(ques)
    res.status(200).json({
      success: true,
      ques,
    })
    
   
  
  }catch(error){
    res.status(200).json({
      success: false,
      error: ("sone error in end file"),
    })
  }

  
};
