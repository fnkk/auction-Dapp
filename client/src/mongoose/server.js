var express = require('express');
var app = express();

app.listen(3555,()=>{
    console.log("server start,listening port 3555")
});

app.get('/',(req,res)=>{
    res.send("hello world");
})