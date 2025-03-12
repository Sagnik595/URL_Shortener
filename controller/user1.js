const express = require('express')
const {setUser} = require("../service/auth")
const {v4:uuidv4} = require('uuid')
const User = require('../model/user')

async function handleUserSignUp(req,res){
    const {name, email, pass} = req.body;
    await User.create({
        name,
        email,
        pass,
    })

    return res.redirect("/")
}



async function handleUserLogin(req,res){
    const {email, pass} = req.body;
    const user = await User.findOne({email,pass})
    if(!user)
        return res.render("login",{
        error : "Wrong username or password!!",
    })
    const session_id = uuidv4()
    setUser(session_id, user)
    res.cookie('uid', session_id)
    return res.redirect("/")
}


module.exports = {
    handleUserSignUp,
    handleUserLogin,
};