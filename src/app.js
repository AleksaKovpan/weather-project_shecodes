let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let cm = document.querySelector(".current-month");
cm.innerHTML = `${month}`;

let day = days[now.getDay()];
let cd = document.querySelector(".current-day");
cd.innerHTML = `${day}`;

let date = now.getDate();
let cdate = document.querySelector(".current-date");
if (date < 10) {
  date = "0" + date;
}
cdate.innerHTML = `${date}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
         <div class="col-2">
        <div class="day-item">
          <div class="week-day">${day}</div>
          <img src="icons/cloudy-day.svg" alt="" width="48" />
          <div class="day-weather-icon"></div>
          <div class="day-temperature">+15°</div>
        </div>
      </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// function selectCelsiusFeeling(event) {
//   event.preventDefault();

//   let celsiusFeelingValue = document.querySelector(
//     ".current-temp-value-feeling"
//   );
//   celsiusFeelingValue.innerHTML = `feels like +13°`;
// }
// let celsiusFeeling = document.querySelector("#celsius");
// celsius.addEventListener("click", selectCelsiusFeeling);

// function selectFahrenheitFeeling(event) {
//   event.preventDefault();

//   let fahrenheitFeelingValue = document.querySelector(
//     ".current-temp-value-feeling"
//   );
//   fahrenheitFeelingValue.innerHTML = `feels like +55°`;
// }
// let fahrenheitFeeling = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", selectFahrenheitFeeling);
function changeIcon(iconCode) {
  let weatherIcon = "";

  if ([`09d`, `09n`, `10d`, `10n`].includes(iconCode)) {
    weatherIcon = "icons/rainy.svg";
  } else {
    if (iconCode === `01d`) {
      weatherIcon = "icons/day.svg";
    } else {
      if (iconCode === `01n`) {
        weatherIcon = "icons/night.svg";
      } else {
        if (iconCode === `02d`) {
          weatherIcon = "icons/cloudy-day.svg";
        } else {
          if (iconCode === `02n`) {
            weatherIcon = "icons/cloudy-night.svg";
          } else {
            if ([`03d`, `04d`, `03n`, `04n`, `50d`, `50n`].includes(iconCode)) {
              weatherIcon = "icons/cloudy.svg";
            } else {
              if ([`11d`, `11n`].includes(iconCode)) {
                weatherIcon = "icons/thunder.svg";
              } else {
                if ([`13d`, `13n`].includes(iconCode)) {
                  weatherIcon = "icons/snowy.svg";
                }
              }
            }
          }
        }
      }
    }
  }

  return weatherIcon;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  celsiusTemperature = response.data.main.temp;
  document.querySelector(".current-city").innerHTML = response.data.name;
  let temperature = Math.round(celsiusTemperature);
  let cityTemperature = document.querySelector(".current-temp-value");
  cityTemperature.innerHTML = temperature;
  let wind = response.data.wind.speed;
  let cityWind = document.querySelector(".wind-value");
  cityWind.innerHTML = `${wind}`;
  let humidity = response.data.main.humidity;
  let cityHumidity = document.querySelector(".humidity-value");
  cityHumidity.innerHTML = `${humidity}`;
  let weatherDescription = response.data.weather[0].description;
  let cityWeatherDescription = document.querySelector(".weather-description");
  cityWeatherDescription.innerHTML = `${weatherDescription}`;

  celsiusTemperatureFeelsLike = response.data.main.feels_like;

  let feelsLike = Math.round(celsiusTemperatureFeelsLike);
  let cityFeelsLike = document.querySelector(".temp-value-feeling");
  cityFeelsLike.innerHTML = feelsLike;
  let mainIcon = document.querySelector(".weather-icon");
  let iconCode = response.data.weather[0].icon;
  changeIcon(iconCode);
  mainIcon.setAttribute("src", `${changeIcon(iconCode)}`);
  mainIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  let cityName = document.querySelector(".current-city");
  cityName.innerHTML = `${city}`;
}
let form = document.querySelector("#form-id");
form.addEventListener("submit", searchCity);
let button = document.querySelector(".current");
button.addEventListener("click", getCurrentPosition);

function selectCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let celsiusValue = document.querySelector(".current-temp-value");
  celsiusValue.innerHTML = Math.round(celsiusTemperature);
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", selectCelsius);

function selectCelsiusFeelsLike(event) {
  event.preventDefault();
  let celsiusValueFeelsLike = document.querySelector(".temp-value-feeling");
  celsiusValueFeelsLike.innerHTML = Math.round(celsiusTemperatureFeelsLike);
}
let celsiusFeelsLike = document.querySelector("#celsius");
celsiusFeelsLike.addEventListener("click", selectCelsiusFeelsLike);

let celsiusTemperature = null;
let celsiusTemperatureFeelsLike = null;

function selectFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitValue = document.querySelector(".current-temp-value");
  fahrenheitValue.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", selectFahrenheit);

function selectFahrenheitFeelsLike(event) {
  event.preventDefault();
  let fahrenheitTemperatureFeelsLike =
    (celsiusTemperatureFeelsLike * 9) / 5 + 32;
  let fahrenheitValueFeelsLike = document.querySelector(".temp-value-feeling");
  fahrenheitValueFeelsLike.innerHTML = Math.round(
    fahrenheitTemperatureFeelsLike
  );
}
let fahrenheitFeelsLike = document.querySelector("#fahrenheit");
fahrenheitFeelsLike.addEventListener("click", selectFahrenheitFeelsLike);
// displayForecast();
