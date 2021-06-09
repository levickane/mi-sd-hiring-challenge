import { convertDate, getDayOfWeek } from './utils';
import { getGeoByZip, getWeatherByLatLon } from './api';

(async function () {
  const geoData = await getGeoByZip(60639);

  var rightNow = new Date();
  let formattedDate = `${
    rightNow.getMonth() + 1
  }/${rightNow.getDate()}/${rightNow.getFullYear()}`;

  const weatherData = await getWeatherByLatLon(
    geoData.lat,
    geoData.lon,
    formattedDate
  );
  const cityName = document.getElementById('cityName');
  cityName.innerHTML = `Weather forecast for ${geoData.city}`;
  const weathCardContainer = document.getElementById('weatherCardContainer');
  for (let i = 0; i < Math.min(3, weatherData.daily.data.length); i++) {
    let dailyData = weatherData.daily.data[i];
    let liEl = document.createElement('li');
    let todayString = '';
    if (i == 0) {
      todayString = 'Today';
    } else {
      let tempDay = new Date(convertDate(dailyData.time));
      todayString = getDayOfWeek(tempDay.getDay());
    }
    let weatherIcon = '';
    switch (dailyData.icon) {
      case 'cloudy':
        weatherIcon = 'cloudy.d8afbff7.png';
        break;
      case 'rain':
        weatherIcon = 'rain.536e76f6.png';
        break;
      case 'snow':
        weatherIcon = 'snow.af099d52.png';
        break;
      default:
        weatherIcon = 'sunny.104d9cd4.png';
        break;
    }
    liEl.innerHTML = `
    <h2>${todayString}:</h2>
    <img src="${weatherIcon}" />
    <p>${dailyData.summary}</p>
    <p>${dailyData.temperatureHigh} / ${dailyData.temperatureLow} Weather Units</p>
  `;
    weathCardContainer.appendChild(liEl);
  }
})();
