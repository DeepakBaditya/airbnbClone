const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const Listing = require('./models/Listing')
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapasync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate);

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main(){
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

app.listen(8080,()=>{
    console.log("app is listening on 8080")
});

app.get("/", (req, res) => {
    res.send("Root is working");
})

//INDEX route
app.get("/listings",wrapasync((async (req,res)=>{
    let allListings = await Listing.find();
    res.render("listings/index.ejs",{ allListings });
})));

// TEST route
app.get("/testListing",wrapasync(async (req,res)=>{
    let sampleListing = new Listing({
        title : "myHome",
        description : "By the beach",
        price : 1200,
        location : "Calangute, Goa",
        country : "india",
    });
    await sampleListing.save()
    console.log("Smaple was saved");
    res.send("Successful testing");
}))
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

// SHOW route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{ listing });
    
})

// CREATE route
app.post("/listings",wrapasync(async (req,res,next)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"sent valid data for listing");
    }
    const newListing = new Listing(req.body.listing)
    await newListing.save()
    res.redirect("listings");
}));
// app.post("/listings",async (req,res,next)=>{
//     try{
//         const newListing = new Listing(req.body.listing)
//         await newListing.save()
//         res.redirect("listings");
//     } catch(err){
//         next(err);
//     }
// });

// EDIT route
app.get("/listings/:id/edit",wrapasync(async (req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{ listing });
}))

// UPDATE route
app.put("/listings/:id/", wrapasync(async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Please provide valid data for the listing.");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listings/${id}`);
}));

// DELETE route
app.delete("/listings/:id/",wrapasync(async (req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

// Page not found route
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})

// Error handling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong." } = err;
    res.status(status).render("error.ejs", { err });
});