require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const question = require("./models/questionschema")
const profileschema = require("./models/profileSchema")
const path = require('path');
const fs = require('fs')

//Port Setup
const app = express();
const port = process.env.PORT || 5000;

//Collection Files     Note: Curently Not in Used 
const questions_users = require("./collections/questions");
const display_users = require("./collections/displayprofile")
const update_users = require("./collections/update")
const end_survey = require("./collections/end")
const publish_survey = require("./collections/publish")
const draft_survey = require("./collections/draft")
const delete_survey = require("./collections/delete")
const profile_user = require("./collections/profile")
const add_job = require("./collections/addJobs")
const display_jobs = require("./collections/displayJobs")

//Middleware Files
const { protect } = require("./middleware/auth");
const errorHandler = require("./middleware/error");


//Data Parsing
app.use(express.json());
app.use(cors()) 
connectDB();

// app.get("/", (req, res, next) => {
//   res.send("Api running");
// });

app.post("/questions" , questions_users)
app.get("/displayprofile/:id", display_users)

app.post("/profile", profile_user)
app.post("/addjobs", add_job)
app.get("/displayjobs", display_jobs)

// update survey 
app.put("/:id", update_users)
app.put("/end/:id", end_survey)
app.put("/publish/:id", publish_survey)
app.put("/draft/:id", draft_survey)
app.get("/delete/:id", delete_survey)


app.get('/user/:id', async (req, res)=> {
  // res.send('user' + req.params.id); 

  const que = await question.findById(req.params.id)
  console.log(que)
  res.status(200).json({
    success: true,
    pastById: que,
  })
});

app.post('/profilepost' , async (req, res) => {
     let newprofile = new profileschema(req.body)
     let saveprofile = await newprofile.save();
     res.json(saveprofile)
})







// HTTP request logger
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error Handler Middleware
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Sever running on port ${port}`)
);



