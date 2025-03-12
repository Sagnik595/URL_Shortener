// MongoDB schema designing

const mongoose=require('mongoose');

const url_schema= new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type: String,
        required: true,
    },
    totalClicks:{
        type: Number,
        require: true,
    },
    visit_history: [{timestamps: {type: Date}}],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
},
{timestamps: true}
);

const URL=mongoose.model("url", url_schema);
module.exports = URL;