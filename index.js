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

function futureForecast() {
  let newfutureForecast = document.querySelector(".future-temperature");

  let forecastInject = `<div class="row">`;
  let weekdays = ["Mon", "Tue", "Thu", "Fri", "Sat"];
  weekdays.forEach(function (day) {
    forecastInject =
      forecastInject +
      ` 
          <div class="col">
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              width="70px"
            />
            <br />
            ${day} <br />11° <span id="shaded-number">6°</span>
          </div>
       
      `;
  });

  forecastInject = forecastInject + `</div>`;
  newfutureForecast.innerHTML = forecastInject;
}
futureForecast();

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

  celtemp = newNormal;
  highT = newHigh;
  lowT = newLow;
}

function newFaren(event) {
  let farnhiteNew = document.querySelector("#currently");

  celciusConversion.classList.remove("clicked");
  farenhiteConversion.classList.add("clicked");

  let ftemp = Math.round((celtemp * 9) / 5 + 32);
  farnhiteNew.innerHTML = `${ftemp}°F`;

  let highnew = document.querySelector("#highs-of");
  let hightemp = Math.round((highT * 9) / 5 + 32);
  highnew.innerHTML = `${hightemp}°F`;

  let lownew = document.querySelector("#lows-of");
  let lowtemp = Math.round((lowT * 9) / 5 + 32);
  lownew.innerHTML = `${lowtemp}°F`;
}

function newCel(event) {
  celciusConversion.classList.add("clicked");
  farenhiteConversion.classList.remove("clicked");

  let returnedCelcius = document.querySelector("#currently");
  returnedCelcius.innerHTML = `${celtemp}°C`;

  let returnedCelciushigh = document.querySelector("#highs-of");
  returnedCelciushigh.innerHTML = `${highT}°C`;

  let returnedCelciuslow = document.querySelector("#lows-of");
  returnedCelciuslow.innerHTML = `${lowT}°C`;
}

let farenhiteConversion = document.querySelector("#farenhite-button");
farenhiteConversion.addEventListener("click", newFaren);

let celciusConversion = document.querySelector("#celcius-button");
celciusConversion.addEventListener("click", newCel);

function search(newCity) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locationTemp);
}

search("London");
