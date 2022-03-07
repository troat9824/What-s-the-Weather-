var myKey = config.My_Key;
var userFormEl = document.querySelector("#user-form");
var cityNameInputEl = document.querySelector("#city-name");
var citySearchTerm = document.querySelector(".city-search-term");
var daysContainer = document.querySelector("#days-container");



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
    // weather app url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=" + myKey;

    // make request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, cityName);
        });
    });

};

// not working
displayWeather = function(weather, searchTerm) {
    // clear old content
    daysContainer.textContent = "";
    citySearchTerm.textContent = searchTerm;

    console.log(searchTerm);
    console.log(weather);

    for (var i = 0; i < weather.length; i++) {
        // format city name
        var cityWeather = weather[i].name + weather[i].main.temp;


        //create a container for each repo

        var weatherEl = document.createElement("div");
        weatherEl.classList = "col-12";

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = cityWeather;

        // append to container
        weatherEl.appendChild(titleEl);

        // append container to the dom
        daysContainer.appendChild(weatherEl);
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);
