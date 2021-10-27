const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  register,
  profileview,
  forgotPassword,
  resetPassword,
  addJobs,
  showJobs,
  profile,
  showProfile,
} = require("../controllers/auth");

router.route("/register").post(register);

// router.route("/profileview").post(profileview);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

router.route("/addjobs").post(addJobs)

router.route("/showjobs").get(showJobs)

router.route("/profile").post(profile)

router.route("/showprofile").get(showProfile)

module.exports = router;
