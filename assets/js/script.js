// All global variables (and arrays)

    // My API key for OpenWeather
    var apiKey = "9d9859759466e90e3c8754b872876ef0";

    // The input field for the search bar
    var inputField = document.getElementById("user-input");

    // The submit button for the search form
    var submitBtn = document.getElementById("submit");

    // The container of the current weather
    var mainWeatherContainer = document.getElementById("main-weather");

    // The button for the current UV index
    var uviBtn = document.getElementById("uvi-button");

    // The area where buttons of recently searched cities will appear
    var btnRecentField = document.getElementById("recent-cities");


    // Locations for the forecast temperatures
    var temps = [
        document.getElementById("temp1"),
        document.getElementById("temp2"),
        document.getElementById("temp3"),
        document.getElementById("temp4"),
        document.getElementById("temp5")
    ];

    // Locations for the forecast wind speeds
    var winds = [
        document.getElementById("wind1"),
        document.getElementById("wind2"),
        document.getElementById("wind3"),
        document.getElementById("wind4"),
        document.getElementById("wind5")
    ];

    // Locations for the forecast humidities
    var humidities = [
        document.getElementById("humidity1"),
        document.getElementById("humidity2"),
        document.getElementById("humidity3"),
        document.getElementById("humidity4"),
        document.getElementById("humidity5")
    ];

    // Locations for the forecast dates
    var dates = [
        document.getElementById("date1"),
        document.getElementById("date2"),
        document.getElementById("date3"),
        document.getElementById("date4"),
        document.getElementById("date5")
    ];

    // Locations for the forecast icons
    var icons = [
        document.getElementById("icon1"),
        document.getElementById("icon2"),
        document.getElementById("icon3"),
        document.getElementById("icon4"),
        document.getElementById("icon5")
    ];

    // Array to hold previously searched cities
    var searchedCities = [];


// Functions

    // Initialization function (displays buttons of any previously searched cities when the site loads)
    function init() {
        var searchedCities = JSON.parse(localStorage.getItem("recent"));
        console.log(searchedCities);

        if (searchedCities === null) {
            return;
        } else {
            for (var i = 0; i < searchedCities.length; i++) {
                var recentButton = (document.createElement("button"));
                recentButton.setAttribute("id", searchedCities[i]);
                recentButton.textContent = searchedCities[i];
                btnRecentField.append(recentButton);

                document.getElementById(searchedCities[i]).classList.add("btn", "btn-outline-info", "btn-block");
                document.getElementById(searchedCities[i]).addEventListener("click", resubmitPrev);
            }
        }
    }


    // Uses Geocoding API and One Call API to gather the weather information of a certain city and display it on the page
    function getGeoAndWeather() {

        if (inputField.value === "") {
            inputField.value = "Please input a city!";
            return;
        } else if (inputField.value === "Please input a city!") {
            return;
        } else {
            var userInput = inputField.value;
        }

        var geoInput = userInput.replace(" ", "-");
        var geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + geoInput + "&limit=1&appid=" + apiKey;
        fetch(geoApiUrl)    //Geocode API
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

                // City Name
                cityName = data[0].name;
                console.log(cityName);
                document.getElementById("name").textContent = cityName;
            })
            .then(function () {         //Previously Searched Button is created or updated
                // if the button exists, then it's moved to top of div by prepending and moved to front of array by removing and then re-inputting it at the front
                if (document.getElementById(cityName)) {
                    console.log("Button has already been created.")
                    btnRecentField.prepend(document.getElementById(cityName));

                    if (searchedCities.indexOf(cityName) > 0) {
                        searchedCities.splice(searchedCities.indexOf(cityName), 1);
                        searchedCities.unshift(cityName);
                        console.log(searchedCities);
                        localStorage.setItem("recent", JSON.stringify(searchedCities));  //saves or updates the searchedCities array
                    }

                } else {           //if button does not already exist then it is created, added to the div, and added to array
                    var recentButton = (document.createElement("button"));
                    recentButton.setAttribute("id", cityName);
                    recentButton.textContent = cityName;
                    btnRecentField.prepend(recentButton);

                    document.getElementById(cityName).classList.add("btn", "btn-outline-info", "btn-block");
                    document.getElementById(cityName).addEventListener("click", resubmitPrev);

                    searchedCities.unshift(cityName);
                    console.log(searchedCities);
                    localStorage.setItem("recent", JSON.stringify(searchedCities));
                }
            })
            .then(function () {
                var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + geoLat + "&lon=" + geoLon + "&units=imperial&exclude=minutely,hourly,daily,alerts&appid=" + apiKey
                fetch(weatherApiUrl)    //One Call API (Current)
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

                        // adds icon for current weather
                        document.getElementById("icon").innerHTML = ("<img src='https://openweathermap.org/img/wn/" + currentIcon + "@2x.png'>");

                        // adds color to show severity of UV index
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
                fetch(weatherApiUrl) //One Call API (Daily)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);

                        for (var i = 1; i < 6; i++) {
                            // Forecast Dates
                            dates[(i - 1)].textContent = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");

                            // Forecast Icons
                            icons[(i - 1)].innerHTML = ("<img src='https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png'>");

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

    // Resubmits a previously searched city into the getGeoAndWeather function (id of the button === a city that has already been searched)
    function resubmitPrev() {
        var nameCity = $(this).attr("id");   
        console.log(nameCity);
        inputField.value = nameCity;

        getGeoAndWeather();
    };


// Event listeners for submit button
    // Prevents the form from reloading
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
    });

    // Calls the getGeoAndWeather function when submit button is clicked
    submitBtn.addEventListener("click", getGeoAndWeather);

    
// Calls initialization function on page load
init();