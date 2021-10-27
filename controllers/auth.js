const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const addNewJobSchema = require("../models/addNewJobSchema")
const profileschema = require("../models/profileSchema")
const sendEmail = require("../utils/sendEmail");
const mongoose = require('mongoose')

// @desc    Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Register user
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User({
      _id: mongoose.Types.ObjectId(),
      username,
      email,
      password,
    });

    const savedata = await user.save();
  console.log(savedata)

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Forgot Password Initialization
exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset User Password
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  userId = user.id
  res.status(statusCode).json({ sucess: true, token, userId});

  // console.log("Harshal")
  console.log(user.id)
};
 


exports.addJobs = async (req, res) => {

  try {
      console.log(req.body.companyName);
      console.log(req.body.designation);
      console.log(req.body.location);
      console.log(req.body.applyLink);
     
      const storeprofile = new addNewJobSchema({
          companyName:req.body.companyName,
          designation:req.body.designation,
          location:req.body.location,
          applyLink:req.body.applyLink,        
      })

    const resistered = await storeprofile.save();
    console.log("harshal" + resistered)
    res.send(resistered)
    
      
  } catch (e) {
      console.log("error")
  }
}



exports.showJobs = async (req, res) => {
  console.log("hiii")
  
  try{

    const ques = await addNewJobSchema.find();
    console.log(ques)
    res.status(200).json({
      success: true,
      ques,
    })
    
   
    // console.log("try")
    // const ques = await queschema.find({user: "604dca761fe4dc2cb80200ae"});
    // console.log("cauch")
    // console.log(ques)
    // res.json({
    //   success: true,
    //   pastSurveys: ques,
    // });
  
  }catch(error){
    res.status(200).json({
      success: false,
      error: ("sone error in display job file"),
    })
  }
};



exports.profile = async (req, res) => {

  try {
   
      const storeprofile = new profileschema({
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          mobileNumber:req.body.mobileNumber,
          date:req.body.date,
          address:req.body.address,
          country:req.body.country,
          state:req.body.state,
          city:req.body.city,
          zip:req.body.zip,
          education:req.body.education,
          institute:req.body.institute,
          cvv:req.body.cvv,
          registerId:req.body.registerId,
         
                
      })

    const resistered = await storeprofile.save();
    console.log("harshal" + resistered)
    res.send(resistered)
    
      
  } catch (e) {
      console.log("error")
  }
}


exports.showProfile = async (req, res) => {
  
  try{

    const ques = await profileschema.findOne({registerId : req.params.id});
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
