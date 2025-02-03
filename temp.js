const express = require("express"); 
const app = express();
// app.use((req,res)=>{
//     let {query} = req.query;
//     console.log("hi i am developer");
//     console.log(query);
// })
// app.use(()=>{
//     console.log("hi i am developer");
// })
app.use((req,res,next)=>{
    console.log("hi i am developer");
   next(); //or return next();
   console.log("after hi i am developer");
})
app.use((req,res,next)=>{
    // req.time = Date.now();
    req.time = new Date(Date.now()).toString();

    console.log(req.method,req.hostname,req.path,req.time);
    // console.log(req);
    console.log("hi i am 2nd developer");
    next();
})
app.get("/",(req,res)=>{
    console.log("hi");
})
app.get("/random",(req,res)=>{
    console.log("hi");
});
app.listen(8080,()=>{
    console.log("app is listening on 8080")
});