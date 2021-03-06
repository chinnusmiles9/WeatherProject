const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "bb0d3e38bb77d709a8ba047b4c2c1b73";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(responce) {
    console.log(responce.statusCode);

    responce.on("data", function(data) {

      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"

      res.write("<h1>The weather is currently " + weatherDescription + "</h1>");

      res.write("<h3>The temperature in " + query + " is " + temp + " degrees Celcius</h3>");

      res.write("<img src=" + iconUrl + ">");

      res.send()


    })
  })
})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
