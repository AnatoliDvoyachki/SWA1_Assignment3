const weatherDataUrl = 'http://localhost:8080/data/'
const weatherForecastUrl = 'http://localhost:8080/forecast/'

async function getData(url){
    return await fetch(url);
} 


export {getData,weatherDataUrl,weatherForecastUrl}