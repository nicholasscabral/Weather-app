var tempIcon = document.querySelector(".weather-icon");
var temperature = document.querySelector(".temperature-value");
var description = document.querySelector(".temperature-description");
var local = document.querySelector(".location");
var inputValue = document.querySelector("#inputValue");
var button = document.querySelector("#button");

button.addEventListener("click", getCityData);

function convertTemperature(temperature) {
  let celsius = Math.floor(temperature - 273);
  return celsius + "°C";
}

function getCityData() {
  try {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        inputValue.value +
        "&appid=18154398977a537bd278e8d87bb29dc9&lang=pt_br"
    )
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
    alert(error);
  }
}
