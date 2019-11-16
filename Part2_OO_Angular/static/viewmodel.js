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

  return { addListener }
}
