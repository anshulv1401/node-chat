const path=require('path');
const express=require('express');
const publipath=path.join(__dirname,"../public");
//console.log(__dirname+"../public ");

const port=process.env.PORT || 3000;
console.log(publipath);






var app=express();

app.use(express.static(publipath));

app.listen(port,()=>{


  console.log("server start at port "+ port);
});
