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
var displayTodayEl = document.getElementById("weather-display");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvindexEl = document.getElementById("uvindex");


var weatherForecast = function(coordInfo) {
    var lat = coordInfo.coord.lat;
    var lon = coordInfo.coord.lon;
    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&appid=0b39de7c5eeb24930b2ff17e2fadc282";
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
            console.log(data);
            displayTodayEl.classList.add("blue-border") ;
            var tempC = data.current.temp - 273.15;
            tempEl.textContent += tempC.toFixed(2) + " Celsius";
            windEl.textContent += data.current.wind_speed + "MPH";
            humidityEl.textContent += data.current.humidity + "%";
            var iconCode = data.current.weather[0].icon;
            uvindexEl.innerHTML += data.current.uvi + `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png"/>`;
        
        for (let i = 0; i < 5; i++) {
               var dailyTemp = data.daily[i].temp.day - 273.15;
               var futureDate = new moment().add(i, 'day');
               var dayInfo = document.createElement("li");
               var iconCodeFuture = data.daily[i].weather[0].icon;
               dayInfo.innerHTML = "<h2>"+futureDate.format('l') + "</h2>" + "<br>" +
                `<img src="http://openweathermap.org/img/wn/${iconCodeFuture}@2x.png"/>`  + "<br>" +
                 dailyTemp.toFixed(2) + " Celsius" + "<br>" + data.daily[i].wind_speed + "MPH" + 
                 "<br>" +  data.daily[i].humidity + "%";
               dayInfo.setAttribute("class", "daily-weather-display")
               
               var weatherDisplay = document.getElementById("daily-weather");
               weatherDisplay.appendChild(dayInfo);
        }
        
        });
        } else {
            alert("Error Fetching Data");
        }
    })
};

var displayWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0b39de7c5eeb24930b2ff17e2fadc282";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var weatherInfo = data;
                weatherForecast(weatherInfo);
                var cityTitleEl = document.getElementById("city-name");
                cityTitleEl.textContent = city + "(" + moment().format('l') + ")"; 
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
    tempEl.textContent = "Temp: ";
    windEl.textContent = "Wind Speed: ";
    humidityEl.textContent = "Humidity: ";
    uvindexEl.textContent = "UV Index: ";
    var cityName = cityNameEl.value.trim();

    if (cityName) {
        displayWeather(cityName);
        cityNameEl.value = ""; 
    } else {
        alert("Please enter a city name");
    }

};

citySearchEl.addEventListener("submit", formSubmitHandler);