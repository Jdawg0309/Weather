const locationInput = document.getElementById("GPSForm");
const weeklyForecastOuput = document.querySelector('#weeklyForecast');
const currentWeather = document.querySelector("#curWeatherInfo");
const curWeatherImage = document.querySelector('#curWeatherImage');
const locationText = document.querySelector('#locationText');
const streetInput= document.querySelector('#street');
const cityInput= document.querySelector('#city');
const countryInput = document.querySelector('#country');
const zipCode = document.querySelector('#postalCode');

function getLocationInfo(latitude, longitude) {
  const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;

  fetch(apiUrl).then(function(response){
      return response.json();})
      .then(function(data) {
          console.log(data)
          locationText.innerText = data.address.neighbourhood
      })
}

function getLocationCoordinates(street, city, zipCode, country){
  const ApiUrl = `https://geocode.maps.co/search?street=${street}&city=${city}&state=${state}&postalcode=${zipCode}&country=${country}`
  fetch(apiUrl).then(function(response){
    return response.json();})
    .then(function(data) {
        console.log(data)
    })
}

function getWeatherInfo(latitude, longitude){
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&units=imperial&lon=${longitude}&exclude=current,hourly,minutely&appid=781b79b4bdf6f5ce702f22f81c87a459`;
  fetch(apiUrl).then(function(response){
    return response.json();})
    .then(function(data){
        console.log(data);
        curWeatherImage.setAttribute('src', `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`);
        currentWeather.innerHTML = `<h2>Low: ${data.daily[0].temp.min}\u00B0F\n</h2><h2>High: ${data.daily[0].temp.max}\u00B0F\n</h2><h2>Humidity: ${data.daily[0].humidity}%\n</h2><h2>Wind Speed: ${data.daily[0].wind_speed} mph\n </h2>`;
        for(let i = 1; i < data.daily.length; i ++){
            let curWeather = document.createElement('li');
            let dateCurWeather = document.createElement('div');
            let time = document.createTextNode(new Date(Number(data.daily[i].dt) * 1000).toDateString());
            dateCurWeather.appendChild(time);
            curWeather.appendChild(dateCurWeather);
            dateCurWeather.className = 'dateWeatherCard';
            curWeather.className = 'weatherCard';
            weeklyForecastOuput.appendChild(curWeather);
            let weatherIconCode = data.daily[i].weather[0].icon;
            let weatherImage = document.createElement('div');
            weatherImage.className = 'weatherImage';
            let weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
            let weatherIcon = document.createElement('img');
            weatherIcon.setAttribute('src', weatherIconUrl);
            weatherImage.appendChild(weatherIcon);
            curWeather.appendChild(weatherImage);
            let weatherInfo = document.createElement('div');
            weatherInfo.className = 'weatherInfo';
            weatherInfo.innerHTML = `<h6>Low: ${data.daily[i].temp.min}\u00B0F\n</h6><h6>High: ${data.daily[i].temp.max}\u00B0F\n</h6><h6>Humidity: ${data.daily[i].humidity}%\n</h6><h6>Wind Speed: ${data.daily[i].wind_speed} mph\n </h6>`;
            curWeather.appendChild(weatherInfo);
        }
    })
}

locationInput.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the default form submission

  // get the form field values
  const longitude = document.getElementById("Latitude").value;
  const latitude = document.getElementById("Longitude").value;

  console.log("Running Location Info")
  getLocationInfo(latitude, longitude);
  
  // perform any necessary processing on the data
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  getWeatherInfo(latitude, longitude)
  getLocationCoordinates(street, city, zipCode, country);
  // reset the form
  weeklyForecastOuput.innerHTML = "";
  locationInput.reset();
});



navigator.geolocation.getCurrentPosition(setValues);
function setValues(pos) {
  var crd = pos.coords;
  let latitude = crd.latitude;
  let longitude = crd.longitude;
  getWeatherInfo(latitude, longitude);
  getLocationInfo(latitude, longitude)
}
