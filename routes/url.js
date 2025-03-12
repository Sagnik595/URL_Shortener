// Different routes 

const express= require('express');
const {handleGenerateShortURL, handleGetanalytics} = require("../controller/user")
const router=express.Router();

router.post('/',handleGenerateShortURL)
router.get('/analytics/:shortId',handleGetanalytics);

module.exports = router;