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
current.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(buttonLocation)
);

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
}
