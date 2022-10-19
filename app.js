const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post("/", function(req, res) {

      const query = req.body.cityName;
      const apikey = "a86c21aee5c201680388c50ddf5726e9";
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+apikey+"&units=metric";
      https.get(url, function(response) {
          response.on("data", function(data) {
              const weatherData = JSON.parse(data);
              const temp = weatherData.main.temp;
              const icon = weatherData.weather[0].icon;
              const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
              res.write("<h1>The Weather in " + query + " is " + temp +" Celcius</h1>");
                res.write("<img src =" + imgUrl + ">");
                res.send();
              });
          });
      });

    app.listen(3000, function() {
      console.log("server running on port 3000");
    });
