const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;// extract the unique id og the user from the cookies
    console.log(userUid)
    if (!userUid) return res.redirect("/login");// cookies will only gnerate when the rigth user logs in or else it is NULL

    const user = getUser(userUid);// this stores the user description of the user after it is checked that the uid exists

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}


async function checkAuth(req, res, next)
{
    const userUid = req.cookies?.uid;// extract the unique id og the user from the cookies

    const user = getUser(userUid);// this stores the user description of the user after it is checked that the uid exists

    req.user = user;
    next();

}
module.exports={
    restrictToLoggedinUserOnly,
    checkAuth,
}