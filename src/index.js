let p = document.querySelector("p.sunny");
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let date = [now.getDate()];
let hours = [now.getHours()];
let minutes = [now.getMinutes()];

p.innerHTML = `${day}, ${date}. ${hours}:${minutes}`;

function showResponse(response) {
  let cityName = document.querySelector("#city");
  let temperature = document.querySelector("#temp");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#windval");
  let temperatureval = Math.round(response.data.main.temp);
  let humidityval = Math.round(response.data.main.humidity);
  let windval = Math.round(response.data.wind.speed);
  let cityval = response.data.name;
  temperature.innerHTML = temperatureval;
  humidity.innerHTML = humidityval;
  wind.innerHTML = windval;
  cityName.innerHTML = cityval;
}

//City Input
function searchCity(cityIn) {
  let apiKey = "2da40a2dd6ecb600a6befee8dc71a523";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityIn}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResponse);
}

function submitSearch(event) {
  event.preventDefault();
  let cityIn = document.querySelector("#city-input").value;
  searchCity(cityIn);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitSearch);

searchCity("Avon");

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2da40a2dd6ecb600a6befee8dc71a523";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResponse);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", getCurrentPosition);

let searchSubmit = document.querySelector("#search-form");
searchSubmit.addEventListener("submit", searchCity);
