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

/*  const hire = async (id, salary) => {
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    const employee_res = await fetch('http://localhost:8080/employees', { method: 'POST', body: JSON.stringify({salary, manager:false}), headers })
    const employee = await employee_res.json()
    const { employeeId } = employee
    const person_res = await fetch('http://localhost:8080/persons/' + id, { method: 'PATCH', body: JSON.stringify({ employeeId }), headers })
    const person = await person_res.json()
    weatherDataModel.addEmployee(employee)
    weatherDataModel.updatePerson(person)
    notify()
  }*/

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

  function addWeatherPrediction(newWeatherData) {
      weatherDataModel.addWeatherDataReport(newWeatherData)
      notify()
      // bindToView(weatherData)
  }

  return { addListener, showLatestWeatherData, showMinimumTemperatureWeatherData, 
           showMaximumTemperatureWeatherData, showTotalPrecipitation, showAverageWindSpeed, 
           showAverageCloudCoverage, showDominantWindDirection, showHourlyWeatherPredictions,
           addWeatherPrediction }
}
