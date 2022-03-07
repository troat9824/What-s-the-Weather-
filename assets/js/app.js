var myKey = config.My_Key;
var userFormEl = document.querySelector("#user-form");
var cityNameInputEl = document.querySelector("#city-name");
var citySearchTerm = document.querySelector(".city-search-term");
var daysContainerUl = document.querySelector(".days-container-ul");
var currentWeatherContainer = document.querySelector(".currentWeatherContainer")
var daysContainer = document.querySelector("#days-container")


var formSubmitHandler = function(event) {
    event.preventDefault();

    // get city from form input
    var cityName = cityNameInputEl.value.trim();

    if (cityName) {
        getWeather(cityName);
        cityNameInputEl.value = "";
    } else {
        alert("Please enter a City name");
    };
};
// for weather
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

getWeather = function(cityName) {
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + myKey;




    fetch(geoUrl).then(function(response) {
        response.json().then(function(data) {


            console.log(data[0]);
            console.log(data[0].lat, data[0].lon)

            var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial" + "&appid=" + myKey;

            fetch(apiUrl).then(function(response) {
                response.json().then(function(data) {
                    displayWeather(data, cityName);
                });
            });
        
        });
    });

    // weather app url

 



    // make request to the url

};

// not working
displayWeather = function(weather, searchTerm) {
    // clear old content
    var forecastDayDiv = document.createElement("div");
    var forecastDayP = document.createElement("p");
    currentWeatherContainer.innerHTML = "";
    forecastDayDiv.textContent = "";
    citySearchTerm.textContent = searchTerm;

    

    console.log(searchTerm);
    console.log(weather);
    // current temperature
    var currentTemp = weather.current.temp;

    var currentTempEl = document.createElement("p");
    currentTempEl.classList = "col-12";
    currentTempEl.innerHTML = "Temperature: " + currentTemp + " degrees F";

    currentWeatherContainer.appendChild(currentTempEl);

    // current description
    var currentDesc = weather.current.weather[0].description;

    var currentDescEl = document.createElement("p");
    currentDescEl.classList = "col-12";
    currentDescEl.textContent = currentDesc;

    currentWeatherContainer.appendChild(currentDescEl);

    // current humidity
    var currentHumidity = weather.current.humidity;

    var currentHumidityEl = document.createElement("p");
    currentHumidityEl.classList = "col-12";
    currentHumidityEl.innerHTML = "Humidity: " + currentHumidity;

    currentWeatherContainer.appendChild(currentHumidityEl);

    // current wind speed
    var currentWindSpeed = weather.current.wind_speed;

    var currentWindSpeedEl = document.createElement("p");
    currentWindSpeedEl.classList = "col-12";
    currentWindSpeedEl.innerHTML = "Wind Speed: " + currentWindSpeed;

    currentWeatherContainer.appendChild(currentWindSpeedEl);

    // current UV index
    var currentUvi = weather.current.wind_speed;

    var currentUviEl = document.createElement("p");
    currentUviEl.classList = "col-12";
    currentUviEl.innerHTML = "UV Index: " + currentUvi;

    currentWeatherContainer.appendChild(currentUviEl);

    // current UV Index color change

    for (var i = 1; i < 6; i++) {
        
        var forecastDayUl = document.createElement("ul");

        // forecast temp
        var forecastTemp = weather.daily[i].temp.day;
        var weatherElTemp = document.createElement("li");

        weatherElTemp.innerHTML = "Temperature: " + forecastTemp + " degrees F";
        

        // forecast desc
        var forecastDesc = weather.daily[i].weather[0].description;
        weatherElDesc = document.createElement("li");
        weatherElDesc.innerHTML = forecastDesc;

        // append container to the dom

        // add all elements together to day ul
        forecastDayUl.appendChild(weatherElDesc);
        forecastDayUl.appendChild(weatherElTemp);


        forecastDayP.appendChild(forecastDayUl);
        forecastDayDiv.appendChild(forecastDayP);
        daysContainer.appendChild(forecastDayDiv);
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);
