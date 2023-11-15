const locationInput = document.getElementById("locationInput");
const weeklyForecastOuput = document.querySelector('#weeklyForecast');
const currentWeather = document.querySelector("#curWeatherInfo");
const curWeatherImage = document.querySelector('#curWeatherImage');



locationInput.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the default form submission

  // get the form field values
  const latitude = document.getElementById("Latitude").value;
  const longitude = document.getElementById("Longitude").value;
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&units=standard&lon=${longitude}&appid=781b79b4bdf6f5ce702f22f81c87a459`;

  // perform any necessary processing on the data
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

    fetch(apiUrl).then(function(response){
        return response.json();})
        .then(function(data){
            console.log(data);
            curWeatherImage.setAttribute('src', `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`);
            currentWeather.innerHTML = `<h2>Low: ${data.daily[0].temp.min}\u00B0F\n</h2>
            <h2>High: ${data.daily[0].temp.max}\u00B0F\n</h2>`;
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
                weatherInfoText = document.createTextNode(`Low: ${Math.round(data.daily[i].temp.min)}\u00B0 F\nHigh: ${Math.round(data.daily[i].temp.max, 2)}\u00B0 F\nHumidity: ${data.daily[i].humidity}%\nWind Speed: ${data.daily[i].wind_speed} mph\n`);
                weatherInfo.appendChild(weatherInfoText);
                curWeather.appendChild(weatherInfo);
            }
        })

  // reset the form
  weeklyForecastOuput.innerHTML = "";
  locationInput.reset();
});
