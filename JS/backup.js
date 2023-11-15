navigator.geolocation.getCurrentPosition(setValues);

function setValues(pos) {
    var crd = pos.coords;
    let latitude = crd.latitude;
    let longitude = crd.longitude;

    const weeklyForecastOuput = document.querySelector('#weeklyForecast');
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&units=imperial&lon=${longitude}&exclude=current,hourly,minutely&appid=781b79b4bdf6f5ce702f22f81c87a459`;

    fetch(apiUrl).then(function(response){
    return response.json();})
    .then(function(data){
        console.log(data);
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
            let weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
            let weatherIcon = document.createElement('img');
            weatherIcon.setAttribute('src', weatherIconUrl);
            curWeather.appendChild(weatherIcon);
            let weatherInfo = document.createElement('div');
            weatherInfo.className = 'weatherInfo';
            weatherInfoText = document.createTextNode(`Low: ${data.daily[i].temp.min}\u00B0 F\nHigh: ${data.daily[i].temp.max}\u00B0 F\nHumidity: ${data.daily[i].humidity}%\nWind Speed: ${data.daily[i].wind_speed} mph\n`);
            weatherInfo.appendChild(weatherInfoText);
            curWeather.appendChild(weatherInfo);
        }
    })
}

