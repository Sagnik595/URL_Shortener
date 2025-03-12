const express = require('express')
const {connectToMongo}=require("./connection")
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth")
const URL = require('./model/url')
const urlRoute = require('./routes/url')
const staticrouter = require('./routes/StaticRouter')
const userRoute = require('./routes/user')
const app = express()
const path= require('path')
const cookieParser = require('cookie-parser')
const port = 3000

connectToMongo("mongodb://localhost:27017/short-url").then(console.log("Mongo connected"))


app.use(cookieParser())
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render('home',{
//     url:allUrls,
//   });
// });



app.use("/api/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/user",checkAuth, userRoute);
app.use("/", staticrouter);



app.get("/url/:shortID", async (req,res)=>{
  const shortId = req.params.shortID; // shortId= abc
  const entry = await URL.findOneAndUpdate( // this stores the entire json info including id, shortid, redirectURL, etcc

    //  find operation
  {
    shortId:shortId
  },
  // update operation
  {
  $push:{
    visit_history: {
      timestamp: Date.now(),
    },
  },
  $inc:{
    totalClicks : 1,
  },
  }
);
res.redirect(entry.redirectURL);// redirectURL is an element of that model schema
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





