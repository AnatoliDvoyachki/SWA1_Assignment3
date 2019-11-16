const weatherDataUrl = 'http://localhost:9090/data/'
const weatherForecastUrl = 'http://localhost:9090/forecast/'

async const getWeatherData = await fetch(weatherDataUrl)
async const  getWeatherPredictionData = await fetch(weatherForecastUrl)

export {getWeatherData,getWeatherPredictionData}