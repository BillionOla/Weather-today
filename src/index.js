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
//let months = {now.getMonths()};

p.innerHTML = `${day}, ${date}. ${hours}:${minutes}`;

function displayForecast(){

  let forecastElement=document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
let days = ["Thur", "Fri", "Sat", "Sun", "Mon", "Tue"];
days.forEach(function(day){
    forecastHTML = 
  forecastHTML + 
  `
          <div class="col-2" >
             <div weather-forecast-date>${day} </div>
              <div>
               <img 
                src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42" />
                 <div class="weather-forecast-temperature"> 
                  <span class="weather-forecast-temperature-max"> 18° </span>
                   <span class="weather-forecast-temperature-min"> 12° </span>
         </div>
       </div>
      </div>
`;
});
  forecastHTML = forecastHTML + `<div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "2da40a2dd6ecb600a6befee8dc71a523";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
  console.log(apiUrl);
} 

function showResponse(response) {
  let cityVal = document.querySelector("#city");
  let temperatureVal = document.querySelector("#temp");
  let humidityVal = document.querySelector("#hum");
  let windVal = document.querySelector("#windval");
  let iconVal = document.querySelector("#icon")
 let descriptionVal = document.querySelector("#descript");

  celsiusTemperature = response.data.main.temp;
  temperatureVal.innerHTML = Math.round(response.data.main.temp);
  humidityVal.innerHTML = Math.round(response.data.main.humidity);
  windVal.innerHTML = Math.round(response.data.wind.speed);
  descriptionVal.innerHTML = response.data.weather[0].main;
  cityVal.innerHTML = response.data.name;

  iconVal.setAttribute(
   "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
   );
 iconVal.setAttribute("alt", response.data.weather[0].description);

 getForecast(response.data.coord);
}
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


function displayFahrenheitTemperature (event){
  event.preventDefault();
   let temperatureVal = document.querySelector("#temp");
   fahrenheitLink.classList.add("active");
   celsiusLink.classList.remove("active");
 let fahrenheitTemperature = (celsiusTemperature * 9) /5 + 32;
 temperatureVal.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null; 


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);


function displayCelsiusTemperature (event){
  event.preventDefault();
  let temperatureVal = document.querySelector("#temp");
   temperatureVal.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");
displayForecast();

