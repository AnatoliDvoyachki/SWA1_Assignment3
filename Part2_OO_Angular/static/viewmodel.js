export default (initWeatherData, initForecastData) => {
  let weatherDataModel = initWeatherData
  let forecastDataModel = initForecastData

  let listeners = []

  function addListener(listener) {
      listeners.push(listener)
  }

  function notify() {
      listeners.forEach(listener => listener())
  }

  function showLatestWeatherData(cityName) {
      return weatherDataModel.showLatestWeatherData(cityName)
  }

  function showMinimumTemperatureWeatherData(cityName) {
      return weatherDataModel.showMinimumTemperatureWeatherData(cityName)
  }

  function showMaximumTemperatureWeatherData(cityName) {
      return weatherDataModel.showMaximumTemperatureWeatherData(cityName)
  }

  function showTotalPrecipitation(cityName, bindToView) {
      let totalPrecipitation = weatherDataModel.showTotalPrecipitation(cityName)
      bindToView(totalPrecipitation)
  }

  function showAverageWindSpeed(cityName, bindToView) {
      let averageWindSpeed = weatherDataModel.showAverageWindSpeed(cityName)
      bindToView(averageWindSpeed)
  }

  function showAverageCloudCoverage(cityName, bindToView) {
      let averageCloudCoverage = weatherDataModel.showAverageCloudCoverage(cityName)
      bindToView(averageCloudCoverage)
  }

  function showDominantWindDirection(cityName, bindToView) {
      let dominantWindDirection = weatherDataModel.showDominantWindDirection(cityName)
      bindToView(dominantWindDirection)
  }

  function showHourlyWeatherPredictions(cityName, bindToView) {
      let forecastData = forecastDataModel.showHourlyWeatherPredictions(cityName)
      bindToView(forecastData)
  }

  return { addListener, showLatestWeatherData, showMinimumTemperatureWeatherData, 
           showMaximumTemperatureWeatherData, showTotalPrecipitation, showAverageWindSpeed, 
           showAverageCloudCoverage, showDominantWindDirection, showHourlyWeatherPredictions,
           addWeatherPrediction }
}
