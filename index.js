//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  // console.log(req.body.crypto);
  //bitcoin url은 bitcoinAverage.com에서 api-documentation-price-tiker
  //https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD
  var crypto=req.body.crypto;
  var fiat=req.body.fiat;
  var baseURL="https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalURL=baseURL+crypto+fiat;
  request(finalURL,function(error,response,body){
    // console.log(response);
    // console.log(response.statusCode);
    // console.log(body);

    var data = JSON.parse(body);
    var price = data.last;//가격을 알려줄 것임
    var currentDate = data.display_timestamp;
    //res.send는 하나밖에 못보냄, 여러개 보내려먼 res.write써줘야 함
    res.write("<p>The current date is "+currentDate+"</p>");
    res.write("<h1>The price of "+crypto+" is "+price+fiat+"</h1>");
    res.send();
  });
});

//npm install request
//request 사용법 -> 구글링

app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
