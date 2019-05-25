const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = 3000;
const apiKey = process.env.WEATHER_API_KEY;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('index');
});
app.post('/', (req, res)=>{
    // res.render('index');
    // console.log(req.body.city);
    // Make the API call here
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error: "Error, Please try again"});
        }
        else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: "city not found"});
            }else{
                let weatherText = `It's ${weather.main.temp} in ${weather.name}`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});