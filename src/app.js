let now = new Date();
console.log(now);
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

function selectCelsius(event) {
  event.preventDefault();

  let celsiusValue = document.querySelector(".current-temp-value");
  celsiusValue.innerHTML = "+15°";
}
let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", selectCelsius);

function selectFahrenheit(event) {
  event.preventDefault();

  let fahrenheitValue = document.querySelector(".current-temp-value");
  fahrenheitValue.innerHTML = "+59°";
}
let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", selectFahrenheit);

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
function showTemperature(respons) {
  console.log(respons.data);
  document.querySelector(".current-city").innerHTML = respons.data.name;
  let temperature = Math.round(respons.data.main.temp);
  let cityTemperature = document.querySelector(".current-temp-value");
  cityTemperature.innerHTML = `${temperature}°C`;
  let wind = respons.data.wind.speed;
  let cityWind = document.querySelector(".wind-value");
  cityWind.innerHTML = `${wind}`;
  let humidity = respons.data.main.humidity;
  let cityHumidity = document.querySelector(".humidity-value");
  cityHumidity.innerHTML = `${humidity}`;
  let weatherDescription = respons.data.weather[0].description;
  let cityWeatherDescription = document.querySelector(".weather-description");
  cityWeatherDescription.innerHTML = `${weatherDescription}`;
  let feelsLike = Math.round(respons.data.main.feels_like);
  let cityFeelsLike = document.querySelector(".current-temp-value-feeling");
  cityFeelsLike.innerHTML = `feels like ${feelsLike}°C`;
  let mainIcon = document.querySelector(".weather-icon");
  let iconCode = respons.data.weather[0].icon;
  changeIcon(iconCode);
  mainIcon.setAttribute("src", `${changeIcon(iconCode)}`);
  mainIcon.setAttribute("alt", respons.data.weather[0].description);
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
