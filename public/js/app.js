const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weather1Tag = document.querySelector(".weather1");
const weather2Tag = document.querySelector(".weather2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  getWeatherData(location);
  weather1Tag.innerHTML = "Loading...";
});

function getWeatherData(location) {
  const url = `http://localhost:3000/weather?address=${location}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        weather1Tag.innerHTML = data.error;
        weather2Tag.innerHTML = "";
      } else {
        weather1Tag.innerHTML = data.location;
        weather2Tag.innerHTML = data.forecast;
      }
    });
}
