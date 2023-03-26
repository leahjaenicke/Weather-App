function newTime() {
  let now = new Date();
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let weekDay = [
    "Sunday",
    "Monday",
    "Tue",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let newWeekDay = weekDay[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  let currentMinuite = now.getMinutes();
  if (currentMinuite < 10) {
    currentMinuite = `0${currentMinuite}`;
  }
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }

  let todaysDay = document.querySelector("#day-week");
  todaysDay.innerHTML = `${newWeekDay}`;
  let changeTime = document.querySelector("#date-year");
  changeTime.innerHTML = `${currentDate}/${currentMonth}`;

  let changeMinuite = document.querySelector("#date-time");
  changeMinuite.innerHTML = `${currentHour}:${currentMinuite}`;
}
newTime();

function searchEngine(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  let newCity = cityInput.value;
  let inputCity = document.querySelector(" h1");
  inputCity.innerHTML = `${newCity}`;
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locationTemp);
}

let h1 = document.querySelector(".cityForm");
h1.addEventListener("submit", searchEngine);

function buttonLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locationTemp);
}

let current = document.querySelector("#loca-button");
current.addEventListener("click", () =>
  navigator.geolocation.getCurrentPosition(buttonLocation)
);

function newDays(numberDay) {
  let newDay = new Date(numberDay * 1000);
  let date = newDay.getDay();
  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const removeFirst = weekday.shift();
  return weekday[date];
}

function futureForecast(response) {
  let weekdays = response.data.daily;
  let newfutureForecast = document.querySelector(".future-temperature");

  let forecastInject = `<div class="row">`;

  weekdays.forEach(function (newForecast, index) {
    if (index < 5) {
      forecastInject =
        forecastInject +
        ` 
          <div class="col">
            <img
              src="https://openweathermap.org/img/wn/${
                newForecast.weather[0].icon
              }@2x.png"
              width="70px"
            />
            <br />
            ${newDays(newForecast.dt)} <br />${Math.round(
          newForecast.temp.max
        )}° <span id="shaded-number">${Math.round(
          newForecast.temp.min
        )}° </span>
          </div>
       
      `;
    }
  });

  forecastInject = forecastInject + `</div>`;
  newfutureForecast.innerHTML = forecastInject;
}

function getFutureForcast(coordinates) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(futureForecast);
}

function locationTemp(response) {
  let newHigh = Math.round(response.data.main.temp_max);
  let newValue = document.querySelector("#highs-of");
  newValue.innerHTML = `${newHigh}°C`;

  let newLow = Math.round(response.data.main.temp_min);
  let newValueii = document.querySelector("#lows-of");
  newValueii.innerHTML = `${newLow}°C`;

  let newNormal = Math.round(response.data.main.temp);
  let newValueiii = document.querySelector("#currently");
  newValueiii.innerHTML = `${newNormal}°C`;

  let newForcast = response.data.weather[0].description;
  let newValueiiii = document.querySelector(".current-type");
  newValueiiii.innerHTML = `${newForcast}`;

  let newTown = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${newTown}`;

  let wind = Math.round(response.data.wind.speed);
  let newValueiiiii = document.querySelector("#wind-speed");
  newValueiiiii.innerHTML = `Wind:${wind}km/h`;

  let iconSelect = document.querySelector("#c-emoji");
  iconSelect.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getFutureForcast(response.data.coord);
}

function search(newCity) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locationTemp);
}

search("London");
