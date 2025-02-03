const mongoose = require("mongoose");
const Schema = mongoose.Schema; // to not use the  mongoose.Schema repeatedly
const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        default : "https://plus.unsplash.com/premium_photo-1676496046182-356a6a0ed002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHNjYXBlfGVufDB8fDB8fHww",
        set : (v) => v === ""? "https://plus.unsplash.com/premium_photo-1676496046182-356a6a0ed002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHNjYXBlfGVufDB8fDB8fHww" : v, //ternary operator This line is for setting for no value
    },
    price : Number,
    location : String,
    county : String
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
