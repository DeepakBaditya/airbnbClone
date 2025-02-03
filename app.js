const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const Listing = require('./models/Listing')
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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
app.get("/",(req,res)=>{
    res.send("Root is working");
})

//INDEX route
app.get("/listings",async (req,res)=>{
    let allListings = await Listing.find();
    res.render("listings/index.ejs",{ allListings });
});

app.get("/testListing",async (req,res)=>{
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
})
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{ listing });

})

app.post("/listings",async (req,res)=>{
    const newListing = new Listing(req.body.listing)
    await newListing.save()
    res.redirect("listings");

})

app.get("/listings/:id/edit",async (req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{ listing });
})

app.put("/listings/:id/",async (req,res)=>{
    let { id } = req.params;
    // console.log(req.body.listing);
    // ...req.body.listing       dhyan de ispe
    await Listing.findByIdAndUpdate(id, {title : req.body.listing.title},{description : req.body.listing.description},{price : req.body.listing.price},{location : req.body.listing.location});
    res.redirect("/listings");
})

app.delete("/listings/:id/",async (req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})