// a weather dashboard with form inputs
// * I search for a city
//      - I am presented with current and future conditions for that city and that city is added to the search history
//  * I view current weather conditions for that city
//          - I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//  * I view the UV index
//          - I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//  * I view future weather conditions for that city
//          - I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//  * I click on a city in the search history
//          - I am again presented with current and future conditions for that city

var citySearchEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#select-city");

var displayWeather = function(city) {
    var apiUrl = "pro.openweathermap.org/data/2.5/forecast/hourly?q=" + city + "&appid=616fb0ac35774d8ba54d7a3d00cc7f61";
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            alert("Error");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to the Weather Website");
    })
};

var formSubmitHandler = function(event){
    event.preventDefault();
    var cityName = cityNameEl.value.trim();

    if (cityName) {
        displayWeather(cityName);
        cityNameEl.value = "";
        debugger;
    } else {
        alert("Please enter a city name");
    }
};

citySearchEl.addEventListener("submit", formSubmitHandler);