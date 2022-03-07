var myKey = config.My_Key;
var userFormEl = document.querySelector("#user-form");
var cityNameInputEl = document.querySelector("#city-name")


var formSubmitHandler = function(event) {
    event.preventDefault();

    // get city from form input
    var cityName = cityNameInputEl.value.trim();

    if (cityName) {
        getWeather(cityName);
        cityName.value = "";
    } else {
        alert("Please enter a City name");
    };
};
// for weather
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

getWeather = function(cityName) {
    // weather app url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + myKey;

    // make request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });

};

userFormEl.addEventListener("submit", formSubmitHandler);
