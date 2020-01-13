const weatherDataUrl = 'http://localhost:8080/data/'
const weatherForecastUrl = 'http://localhost:8080/forecast/'

function getData(url){
    return fetch(url);
} 

export { getData, weatherDataUrl, weatherForecastUrl }