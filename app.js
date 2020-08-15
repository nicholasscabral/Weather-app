var notification = document.querySelector('.notification')
var tempIcon = document.querySelector(".weather-icon");
var temperature = document.querySelector(".temperature-value");
var description = document.querySelector(".temperature-description");
var local = document.querySelector(".location");
var inputValue = document.querySelector("#inputValue");
var button = document.querySelector("#button");
var UsersLocation = document.querySelector('.usersLocation')

window.addEventListener("keypress", check)
UsersLocation.addEventListener("click", getCurrentLocation)
button.addEventListener("click", getCityData);

function convertTemperature(temperature) {
  let celsius = Math.floor(temperature - 273);
  return celsius + "°C";
}

function getCityData() {
    try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=18154398977a537bd278e8d87bb29dc9&lang=pt_br`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            var city = data["name"];
            var temp = data["main"]["temp"];
            var desc = data["weather"][0]["description"];
            var country = data["sys"]["country"];
            var iconValue = data["weather"][0]["icon"];

            local.innerHTML = `<p>${city}, ${country}</p>`;
            temperature.innerHTML = `<p> ${convertTemperature(temp)}</p>`;
            description.innerHTML = `<p> ${desc} </p>`;
            tempIcon.innerHTML = `<img src="icons/${iconValue}.png">`;

        });
    } catch (error) {
        notification.innerHTML = `<p> ${error.message} </p>`
    }
}

function getCurrentLocation() {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError)
    }
    else {
        notification.innerHTML = `<p> Browser does not support geolocation </p>`
    }
}

function setPosition(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=18154398977a537bd278e8d87bb29dc9`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            var city = data['name']
            var temp = data['main']['temp']
            var desc = data['weather'][0]['description']
            var country = data['sys']['country']
            var iconValue = data['weather'][0]['icon']

            local.innerHTML = `<p>${city}, ${country}</p.>`;
            temperature.innerHTML = `<p> ${convertTemperature(temp)}</p>`;
            description.innerHTML = `<p> ${desc} </p>`;
            tempIcon.innerHTML = `<img src="icons/${iconValue}.png">`;
        })
    } catch (error) {
        notification.innerHTML = `<p> ${error.message} </p>`
    }
}

function showError(error) {
    if(error) {
        notification.innerHTML = `<p> ${error.message} </p>`
    }
}

function check(event) {
    if(event.code == "Enter") {
        getCityData()
    }
}