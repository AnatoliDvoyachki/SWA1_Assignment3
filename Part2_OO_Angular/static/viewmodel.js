export default (init_model) => {
  let model = init_model
  let listeners = []

  const addListener = listener => listeners.push(listener)

  const notify = () => listeners.forEach(listener => listener())

  const hire = async (id, salary) => {
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    const employee_res = await fetch('http://localhost:8080/employees', { method: 'POST', body: JSON.stringify({salary, manager:false}), headers })
    const employee = await employee_res.json()
    const { employeeId } = employee
    const person_res = await fetch('http://localhost:8080/persons/' + id, { method: 'PATCH', body: JSON.stringify({ employeeId }), headers })
    const person = await person_res.json()
    model.addEmployee(employee)
    model.updatePerson(person)
    notify()
  }

  const showLatestWeatherData = (cityName) => {
      return model.showLatestWeatherData(cityName)
  }

  const showMinimumTemperatureWeatherData = (cityName) => {
    return model.showMinimumTemperatureWeatherData(cityName)
  }

  const showMaximumTemperatureWeatherData = (cityName) => {
    return model.showMaximumTemperatureWeatherData(cityName)
  }

  const showTotalPrecipitation = (cityName, bindToView) => {
    let totalPrecipitation = model.showTotalPrecipitation(cityName)
    bindToView(totalPrecipitation)
  }

  const showAverageWindSpeed = (cityName, bindToView) => {
    let averageWindSpeed = model.showAverageWindSpeed(cityName)
    bindToView(averageWindSpeed)
  }

  const showAverageCloudCoverage = (cityName, bindToView) => {
    let averageCloudCoverage = model.showAverageCloudCoverage(cityName)
    bindToView(averageCloudCoverage)
  }

  const showDominantWindDirection = (cityName, bindToView) => {
    let dominantWindDirection = model.showDominantWindDirection(cityName)
    bindToView(dominantWindDirection)
  }

  return { addListener, showLatestWeatherData, showMinimumTemperatureWeatherData, showMaximumTemperatureWeatherData, 
           showTotalPrecipitation, showAverageWindSpeed, showAverageCloudCoverage, showDominantWindDirection }
}
