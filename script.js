const api = {
  endpoint: 'https://api.openweathermap.org/data/2.5/weather?q=',
  api_key: 'ce97fb71fad141c884e3962fba417c62',
  unit: '&units=metric&APPID='
}

const search = document.querySelector('.search');
search.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    weatherResults(search.value);
  }
}

function weatherResults(query) {
  fetch(`${api.endpoint}${query}${api.unit}${api.api_key}`)
  .then(weather => {
    return weather.json();
  }).then(weatherDisplay);
}

function weatherDisplay(weather) {
  let icon_link = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`

  let cityName = document.querySelector('.city-box .city');
  cityName.innerHTML = `<i class="fas fa-map-marker-alt"></i>${weather.name}, ${weather.sys.country}`;

  let temp = document.querySelector('.temp-box .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<sup>c</sup>`;

  let description = document.querySelector('.temp-box .weather');
  description.innerText = weather.weather[0].description.toUpperCase();

  let icon = document.getElementById('icon').src = icon_link;

  let info = document.querySelector('.info');
  info.innerHTML = `Feel like ${Math.round(weather.main.feels_like)}<sup>c</sup> | Humidity: ${weather.main.humidity}% | Wind Speed: ${Math.round(weather.wind.speed)}`;
}

function createDate(d) {
  let months = ["Januari", "Februari", "maret", "April", "Mei", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis","Jum'at", "Sabtu" ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`
}

let now = new Date();
  let date = document.querySelector('.city-box .date');
  date.innerText = createDate(now);