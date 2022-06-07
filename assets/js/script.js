// add the following classes to the recent buttons: city-button btn btn-outline-info btn-block



var apiKey = "9d9859759466e90e3c8754b872876ef0";

var inputField = document.getElementById("user-input");

var submitBtn = document.getElementById("submit");

var mainWeatherContainer = document.getElementById("main-weather");

var uviBtn = document.getElementById("uvi-button");


var temps = [
    document.getElementById("temp1"), 
    document.getElementById("temp2"),
    document.getElementById("temp3"),
    document.getElementById("temp4"),
    document.getElementById("temp5")
];

var winds = [
    document.getElementById("wind1"),
    document.getElementById("wind2"),
    document.getElementById("wind3"),
    document.getElementById("wind4"),
    document.getElementById("wind5")
];

var humidities = [
    document.getElementById("humidity1"),
    document.getElementById("humidity2"),
    document.getElementById("humidity3"),
    document.getElementById("humidity4"),
    document.getElementById("humidity5")
];


var dates = [
    document.getElementById("date1"), 
    document.getElementById("date2"),
    document.getElementById("date3"),
    document.getElementById("date4"),
    document.getElementById("date5") 
];

var icons = [
    document.getElementById("icon1"),
    document.getElementById("icon2"),
    document.getElementById("icon3"),
    document.getElementById("icon4"),
    document.getElementById("icon5")
]



// Functions

function gatherWeather() {
    getGeoAndWeather();
}



// Geocoding API

function getGeoAndWeather() {
    var userInput = inputField.value;
    var geoInput = userInput.replace(" ", "");
    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + geoInput + "&limit=1&appid=" + apiKey;
    fetch(geoApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // latitude
            geoLat = data[0].lat;
            console.log(geoLat);

            // longitude
            geoLon = data[0].lon;
            console.log(geoLon);

            cityName = data[0].name;
            console.log(cityName);
            document.getElementById("name").textContent = cityName;
        })
        .then(function () {
            var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + geoLat + "&lon=" + geoLon + "&units=imperial&exclude=minutely,hourly,daily,alerts&appid=" + apiKey
            fetch(weatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    // Date
                    var currentDate = data.current.dt;
                    var dateString = moment.unix(currentDate).format("MM/DD/YYYY");
                    console.log(dateString);
                    document.getElementById("today").textContent = dateString;


                    // Icon
                    currentIcon = data.current.weather[0].icon;
                    console.log(currentIcon);


                    // Current Temp
                    var currentTemp = data.current.temp;
                    console.log(currentTemp);
                    document.getElementById("temp").textContent = ("Temp: " + currentTemp + "°F");

                    // Current Wind Speed
                    var currentWindSpeed = data.current.wind_speed;
                    console.log(currentWindSpeed);
                    document.getElementById("wind").textContent = ("Wind: " + currentWindSpeed + " MPH");

                    // Current Humidity
                    var currentHumidity = data.current.humidity;
                    console.log(currentHumidity);
                    document.getElementById("humidity").textContent = ("Humidity: " + currentHumidity + "%");

                    // Current UVI
                    currentUVI = data.current.uvi;
                    console.log(currentUVI);
                    document.getElementById("uvi-button").textContent = (currentUVI);
                })
                .then(function () {

                    document.getElementById("icon").innerHTML = ("<img src='http://openweathermap.org/img/wn/" + currentIcon + "@2x.png'>");

                    if (currentUVI <= 2) {
                        uviBtn.classList.remove("btn-danger");
                        uviBtn.classList.remove("btn-warning");
                        uviBtn.classList.add("btn-success");
                    } else if (currentUVI >= 6) {
                        uviBtn.classList.remove("btn-success");
                        uviBtn.classList.remove("btn-warning");
                        uviBtn.classList.add("btn-danger");
                    } else {
                        uviBtn.classList.remove("btn-success");
                        uviBtn.classList.remove("btn-danger");
                        uviBtn.classList.add("btn-warning");
                    }
                });
        })
        .then(function () {
            var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + geoLat + "&lon=" + geoLon + "&units=imperial&exclude=current,minutely,hourly,alerts&appid=" + apiKey
            fetch(weatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);



                    for (var i = 1; i < 6; i++) {
                        // Forecast Dates
                       dates[(i - 1)].textContent = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");

                        // Forecast Icons
                        icons[(i - 1)].innerHTML = ("<img src='http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png'>");

                        // Forecast Temps
                        temps[(i - 1)].textContent = ("Temp: " + data.daily[i].temp.day + "°F");

                        //Forecast Wind Speeds
                        winds[(i - 1)].textContent = ("Wind: " + data.daily[i].wind_speed + " MPH");

                        // Forecast Humidities
                        humidities[(i - 1)].textContent = ("Humidity: " + data.daily[i].humidity + "%");
                    }
                })
        })
};









submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
});

submitBtn.addEventListener("click", gatherWeather);

// submitBtn.addEventListener("click", getLatLong);



// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// need to change this to fit the link above
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;


// fetch(queryURL)



