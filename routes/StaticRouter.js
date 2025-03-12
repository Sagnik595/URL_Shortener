const express = require("express");
const URL = require("../model/url");
const {checkAuth} = require("../middlewares/auth")
const router = express.Router();


router.get("/",checkAuth,async(req,res) => {
  if (!req.user) return res.redirect("/login")
    const allurls = await URL.find({createdBy: req.user._id})
    return res.render("home",{
        urls:allurls,
    }
    );
  });
  
router.get("/signup",(req,res)=>{
  return res.render("signup")
})


router.get("/login",(req,res)=>{
  return res.render("login")
})

module.exports = router;
