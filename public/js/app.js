const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weather1Tag = document.querySelector(".weather1");
const weather2Tag = document.querySelector(".weather2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  weather1Tag.innerHTML = "Loading...";
  weather2Tag.innerHTML = "";
  getWeatherData(location);
});

function getWeatherData(location) {
  const url = `/weather?address=${location}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        weather1Tag.innerHTML = data.error;
      } else {
        weather1Tag.innerHTML = data.location;
        weather2Tag.innerHTML = data.forecast;
      }
    });
}
