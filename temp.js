const express = require("express"); 
const ExpressError = require("./expresserror");
const app = express();
// app.use((req,res)=>{
//     let {query} = req.query;
//     console.log("hi i am developer");
//     console.log(query);
// })
// app.use(()=>{
//     console.log("hi i am developer");
// })
// app.use((req,res,next)=>{
//     console.log("hi i am developer");
//    next(); //or return next();
//    console.log("after hi i am developer");
// })
// app.use((req,res,next)=>{
//     // req.time = Date.now();
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method,req.hostname,req.path,req.time);
//     // console.log(req);
//     console.log("hi i am 2nd developer");
//     next();
// })
app.get("/",(req,res)=>{
    console.log("hi");
});
// app.get("/random",(req,res)=>{
//     console.log("hi");
// });
app.listen(8080,()=>{
    console.log("app is listening on 8080")
});

// API TOKEN AS QUERY STRING
// Let's create a middle ware for an api that checks if the access token was passed in the query string or not

// app.use("/api",(req,res,next)=>{
//     let {token} = req.query;
//     if(token === "giveaccess"){
//         next();
//     }else{
//         res.send("Access Denied");
//     }
// })
// app.get("/api",(req,res)=>{
//     res.send("valuable data");
// })

// MULTIPLE MIDDLEWARE
// const checkToken = (req,res,next)=>{
//     let {token} = req.query;
//     if(token === "giveaccess"){
//         next();
//     }else{
//         res.send("Access Denied");
//     }
// }
// app.get("/api",checkToken,(req,res)=>{
//     res.send("valuable data");
// })


// handling error -basic
// app.use("/api",(req,res,next)=>{
//     let {token} = req.query;
//     if(token === "giveaccess"){
//         next();
//     }else{
//         throw new Error("Access Denied");
//     }
// })
// app.get("/api",(req,res)=>{
//     res.send("valuable data");
// })

// app.use((req,res)=>{
//     res.status(404).send("Page not found");
// })

app.use("/api",(req,res,next)=>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }else{
        throw new ExpressError(401,"Access Denied");
    }
})
app.get("/api",(req,res)=>{
    res.send("valuable data");
})