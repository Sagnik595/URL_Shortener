// Operational logic

const {nanoid}=require('nanoid');
const URL=require("../model/url");

async function handleGenerateShortURL(req,res) {
    const body=req.body;// client's information along with the requested URL
    if(!body.url){
        res.status(400).json({error:'url is required!!'});
    }
    const short = nanoid(3);
    await URL.create({
        shortId: short,
        redirectURL:body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render('home', {
        id: short
      });

};


async function handleGetanalytics(req,res){
    const shortId = req.params.shortId;
    const r = await URL.findOne({shortId});
    return res.json(r.totalClicks);

}


module.exports={
    handleGenerateShortURL,
    handleGetanalytics
};