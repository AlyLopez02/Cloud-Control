// add the following classes to the recent buttons: city-button btn btn-outline-info btn-block
// also create a <br> above each button





var apiKey = "9d9859759466e90e3c8754b872876ef0";

var inputField = document.getElementById("user-input");

var submitBtn = document.getElementById("submit");

var mainWeatherContainer = document.getElementById("main-weather");

var uviBtn = document.getElementById("uvi-button");


function gatherWeather() {
    getGeoAndWeather();
    // Input moment here or create an initialization function so that the dates will appear
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
                .then(function (){
                    
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



