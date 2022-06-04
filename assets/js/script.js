// add the following classes to the recent buttons: city-button btn btn-outline-info btn-block
// also create a <br> above each button





var apiKey = "9d9859759466e90e3c8754b872876ef0";

var inputField = document.getElementById("user-input");

var submitBtn = document.getElementById("submit");






function gatherWeather() {
    AndWeather();
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
            geoLat = data[0].lat;
            console.log(geoLat);

            geoLon = data[0].lon;
            console.log(geoLon);
        })
        .then(function () {
            var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + geoLat + "&lon=" + geoLon + "&exclude=minutely,hourly,daily,alerts&appid=" + apiKey
            fetch(weatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

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



