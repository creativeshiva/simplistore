//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.get("/storeLocation", function(req, res) {
  res.sendFile(__dirname + "/storeLocation.html");
})


// below line is for Home POST ROUTE

app.post("/", function(req, res){

var data = {
    authorization: "8a19ca98-00ff-46c4-a666-c6756aa93606",
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email,
    subscribed: true,
    overrideExisting: true,
    tags: [
    "viaNewsLetter",
  ]
};

var jsonData = JSON.stringify(data);
// console.log(jsonData);

  const url = "https://api.mailbluster.com/api/leads?authorization=8a19ca98-00ff-46c4-a666-c6756aa93606";
  const options = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      }
  }

  const requesting = https.request(url, options, function(response){
    if(response.statusCode === 201) {
      res.sendFile(__dirname + "/success.html");
    }else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  requesting.write(jsonData);
  requesting.end();
});
// Above line is for Home POST ROUTE

//below line Failure ROUTE which will redirect to home page

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.post("/storeLocation", function(req, res){
    res.redirect("/storeLocation")
})

//Above line Failure ROUTE which will redirect to home page


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
})
