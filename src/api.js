export function getGeoByZip(zip) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.addEventListener('load', function () {
      resolve(JSON.parse(this.responseText));
    });
    req.addEventListener('error', function (e) {
      reject('Error');
    });
    req.open(
      'GET',
      `https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${zip}`
    );
    req.send();
  });
}

export function getWeatherByLatLon(lat, lon, date) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.addEventListener('load', function () {
      resolve(JSON.parse(this.responseText));
    });
    req.addEventListener('error', function (e) {
      reject('Error');
    });
    req.open(
      'GET',
      `https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${lat}&longitude=${lon}&date=${date}`
    );
    req.send();
  });
}
