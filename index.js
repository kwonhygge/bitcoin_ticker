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
  var amount=req.body.amount;

  //parameter가지고 API call을 할 때, 쉽게 하는 법은 request에 옵션 값을 넣어서하는 것. 문서에 나와있음
  var options={
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:{
      from: crypto,
      to: fiat,
      amount:amount
    }
  };



  request(options,function(error,response,body){
    // console.log(response);
    // console.log(response.statusCode);
    // console.log(body);

    var data = JSON.parse(body);
    //request 방식이 달라져서 json가져오는 방식도 다 밑에처럼 다름
    var price = data.price;
    var currentDate = data.time;
    //res.send는 하나밖에 못보냄, 여러개 보내려먼 res.write써줘야 함
    res.write("<p>The current date is "+currentDate+"</p>");
    res.write("<h1>The price of "+amount+crypto+" is currently worth "+price+fiat+"</h1>");
    res.send();
  });
});

//npm install request
//request 사용법 -> 구글링

app.listen(process.env.PORT||3000,function(){
  console.log("Server is running on port 3000.");
});
