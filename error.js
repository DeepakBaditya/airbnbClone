const express = require("express"); 
const app = express();
app.get("/",(req,res)=>{
    console.log("hi");
});
app.listen(8080,()=>{
    console.log("app is listening on 8080")
});
app.get("/err",(req,res)=>{
    abcd = abcd;
});
app.use((err,req,res,next)=>{
    // console.log(err);
    console.log("====ERROR====");
    next(err); // it calls the default error handler
});