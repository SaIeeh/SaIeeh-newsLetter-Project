const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const https = require("https");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
console.log(email);
   const data = JSON.stringify({
    members : [
        {
            email_address: email,
            status: "subscribed",
            merge_field: {
              FNAME: firstName,
              LNAME: lastName,
            },
        },
    ],
    sync_tags: false,
    update_existing: false,
   });

   const url = "https://us21.api.mailchimp.com/3.0/lists/4ca3569a45";
   const options = {
    method : "POST" ,
    auth : "Saleh:"+process.env.KEY , 
    headers: {
        "content-type": "application/json",
      },
   }
    const request = https.request(url,options , function(response){
        console.log(response.statusCode);
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname + "/failure.html")
        }
response.on("data" , function(data){
    console.log(JSON.parse(data));
 
})
    })
    request.write(data);
    request.end();

});


app.post("/failure", function(req, res) {
res.redirect("/");

});


app.listen(3000, function() {
    console.log("Server is running on port 3000");
});

// api key 
// 714b31fecb15047779188767951b2ae3-us21


// new api key : 
// b302cb3720ec96e666d69f2d9b5c1ee4-us21
