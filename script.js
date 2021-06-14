var today = new Date();
var now = today.getDay();
var days = ["Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saturday", "Sunday"];
var day = days[now - 1];
var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes();
var dateTime = day + " - " + date + " - " + time;
timing.innerHTML = dateTime;

function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "ca676571878294269458ad76e22c6693";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=imperial";

      console.log(url)

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = data.main.temp;
        let feels_like = data.main.feels_like;
        temperature.innerHTML = temp + " °F" + " (Feels like: " + feels_like + " °F)";
        location.innerHTML =
        data.name;
        let humidity = data.main.humidity;
        description.innerHTML = data.weather[0].main + ", Humidity: " + humidity;
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();
