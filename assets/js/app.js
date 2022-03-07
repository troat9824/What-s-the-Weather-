var myKey = config.My_Key;
var userFormEl = document.querySelector("#user-form");
var cityNameInputEl = document.querySelector("#city-name");
var citySearchTerm = document.querySelector(".city-search-term");
var daysContainerUl = document.querySelector(".days-container-ul");
var currentWeatherContainer = document.querySelector(".currentWeatherContainer");
var daysContainer = document.querySelector("#days-container");
var lineBreak = document.createElement("br");


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

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
// for weather
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

getWeather = function(cityName) {
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + myKey;




    fetch(geoUrl).then(function(response) {
        response.json().then(function(data) {


            console.log(data[0]);
            console.log(data[0].lat, data[0].lon)
            // weather app url
            var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial" + "&appid=" + myKey;

            fetch(apiUrl).then(function(response) {
                response.json().then(function(data) {
                    displayWeather(data, cityName);
                });
            });
        
        });
    });

};

// not working
displayWeather = function(weather, searchTerm) {
    // clear old content
    searchTerm = toTitleCase(searchTerm);

    currentWeatherContainer.innerHTML = "";
    daysContainer.innerHTML = "";
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    citySearchTerm.textContent = searchTerm + " " + today;

    var subtitle = document.createElement("h2")
    subtitle.innerHTML = "5 Day Forecast: ";
    subtitle.setAttribute("class", "col-12 text-center")
    daysContainer.appendChild(subtitle);

    console.log(searchTerm);
    console.log(weather);
    // current temperature
    var currentTemp = weather.current.temp;
    var currentTempEl = document.createElement("p");
    currentTempEl.classList = "text-start";
    currentTempEl.innerHTML = "Temperature: " + currentTemp + " degrees F";

    currentWeatherContainer.appendChild(currentTempEl);

    // current description
    var currentDesc = weather.current.weather[0].description;
    currentDesc = toTitleCase(currentDesc);
    var currentDescEl = document.createElement("p");
    currentDescEl.classList = "text-start";
    currentDescEl.textContent = currentDesc;

    currentWeatherContainer.appendChild(currentDescEl);

    // current humidity
    var currentHumidity = weather.current.humidity;
    var currentHumidityEl = document.createElement("p");
    currentHumidityEl.classList = "text-start";
    currentHumidityEl.innerHTML = "Humidity: " + currentHumidity;

    currentWeatherContainer.appendChild(currentHumidityEl);

    // current wind speed
    var currentWindSpeed = weather.current.wind_speed;
    var currentWindSpeedEl = document.createElement("p");
    currentWindSpeedEl.classList = "text-start";
    currentWindSpeedEl.innerHTML = "Wind Speed: " + currentWindSpeed;

    currentWeatherContainer.appendChild(currentWindSpeedEl);

    // current UV index
    var currentUvi = weather.current.uvi;
    var currentUviEl = document.createElement("p");
    currentUviEl.classList = "text-start";
    currentUviEl.innerHTML = "UV Index: " + currentUvi;

    currentWeatherContainer.appendChild(currentUviEl);

    // current UV Index color change

    for (var i = 1; i < 6; i++) {
        var forecastDayDiv = document.createElement("div");
        var forecastDayP = document.createElement("p");
        var forecastDayUl = document.createElement("ul");
        

        var tomorrow = new Date();
        var dd = String(tomorrow.getDate() + i).padStart(2, '0');
        var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = tomorrow.getFullYear();
        tomorrow = mm + '/' + dd + '/' + yyyy;
        var futureDateEl = document.createElement("li");
        futureDateEl.innerHTML = tomorrow;

    
        

        // forecast temp
        var forecastTemp = weather.daily[i].temp.day;
        var weatherElTemp = document.createElement("li");

        weatherElTemp.innerHTML = "Temperature: " + forecastTemp + " degrees F";
        

        // forecast desc
        var forecastDesc = weather.daily[i].weather[0].description;
        forecastDesc = toTitleCase(currentDesc);
        weatherElDesc = document.createElement("li");
        weatherElDesc.innerHTML = forecastDesc;

        // forecast humidity
        var forecastHum = weather.daily[i].humidity;
        weatherElHum = document.createElement("li");
        weatherElHum.innerHTML = "Humidity: " + forecastHum;

        // forecast wind speed
        var forecastWindSpeed = weather.daily[i].wind_speed;
        weatherElWindSpeed = document.createElement("li");
        weatherElWindSpeed.innerHTML = "Wind Speed: " + forecastWindSpeed;

        // forecast uv index
        var forecastUvi = weather.daily[i].uvi;
        weatherElUvi = document.createElement("li");
        weatherElUvi.innerHTML = "UV Index: " + forecastUvi;
        
        // append container to the dom

        // add all elements together to day ul
        forecastDayUl.appendChild(futureDateEl);
        forecastDayUl.appendChild(weatherElDesc);
        forecastDayUl.appendChild(weatherElTemp);
        forecastDayUl.appendChild(weatherElHum);
        forecastDayUl.appendChild(weatherElWindSpeed);
        forecastDayUl.appendChild(weatherElUvi);



        // add ul to container
        forecastDayP.appendChild(forecastDayUl);
        forecastDayDiv.appendChild(forecastDayP);
        daysContainer.appendChild(forecastDayDiv);

        forecastDayDiv.setAttribute("class", "card flex-wrap justify-content-space-between")
        forecastDayP.setAttribute("class", "card-body flex dayP")
        forecastDayUl.setAttribute("class", "card-text text-center flex-wrap col-2 justify-content-space-between")
    };

}

userFormEl.addEventListener("submit", formSubmitHandler);
