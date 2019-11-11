export default (initWeatherData, initForecastData) => {
  let weatherDataModel = initWeatherData
  let forecastDataModel = initForecastData

  console.log(weatherDataModel)
  console.log(forecastDataModel)

  let listeners = []

  const addListener = listener => listeners.push(listener)

  const notify = () => listeners.forEach(listener => listener())

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

  const showLatestWeatherData = (cityName) => {
      return weatherDataModel.showLatestWeatherData(cityName)
  }

  const showMinimumTemperatureWeatherData = (cityName) => {
    return weatherDataModel.showMinimumTemperatureWeatherData(cityName)
  }

  const showMaximumTemperatureWeatherData = (cityName) => {
    return weatherDataModel.showMaximumTemperatureWeatherData(cityName)
  }

  const showTotalPrecipitation = (cityName, bindToView) => {
    let totalPrecipitation = weatherDataModel.showTotalPrecipitation(cityName)
    bindToView(totalPrecipitation)
  }

  const showAverageWindSpeed = (cityName, bindToView) => {
    let averageWindSpeed = weatherDataModel.showAverageWindSpeed(cityName)
    bindToView(averageWindSpeed)
  }

  const showAverageCloudCoverage = (cityName, bindToView) => {
    let averageCloudCoverage = weatherDataModel.showAverageCloudCoverage(cityName)
    bindToView(averageCloudCoverage)
  }

  const showDominantWindDirection = (cityName, bindToView) => {
    let dominantWindDirection = weatherDataModel.showDominantWindDirection(cityName)
    bindToView(dominantWindDirection)
  }

  const showHourlyWeatherPredictions = (cityName, bindToView) => {
    let forecastData = forecastDataModel.showHourlyWeatherPredictions(cityName)
    bindToView(forecastData)
  }

  return { addListener, showLatestWeatherData, showMinimumTemperatureWeatherData, 
           showMaximumTemperatureWeatherData, showTotalPrecipitation, showAverageWindSpeed, 
           showAverageCloudCoverage, showDominantWindDirection, showHourlyWeatherPredictions }
}
