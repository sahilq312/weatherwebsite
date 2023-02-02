const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function (req, res) {

    res.sendFile(__dirname+"/index.html")
    
});
app.post("/", function (req, res) {

    const query = req.body.cityName;
    const appid = "d7dca041320093f619f42d22a8878f0b";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+ "&appid="+appid+"&units="+unit;
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
       const weatherdata = JSON.parse(data);
       const temp = weatherdata.main.temp;
       const weatherdescription = weatherdata.weather[0].description;
       const icon = weatherdata.weather[0].icon;
       const imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png"
       console.log(weatherdescription);
       console.log(temp);
       res.write("<h1>the temperature in "+query+" is:"+temp+"C</h1>")
       res.write("<p>the weather is:"+ weatherdescription+"</p>")
       res.write("<img src="+ imageURL +">")
       res.send()
            })
        });
    })


app.listen(3000, function() {
    console.log("server is  running on local port 3000")
})