import { getData, weatherDataUrl, weatherForecastUrl } from "../util/ServerCommunicator";

export const CREATE_DATA = "CREATE_DATA"
export const REFRESH_DATA = "REFRESH_DATA"
export const SELECT_CITY = "SELECT_CITY"
export const SELECT_START_DATE = "SELECT_START_DATE"
export const SELECT_END_DATE = "SELECT_END_DATE"
export const FETCH_WEATHER_DATA = "FETCH_WEATHER_DATA"
export const FETCH_FORECAST_DATA = "FETCH_FORECAST_DATA"
export const ERROR = "ERROR"

export function createData(newWeatherReport, selectedCity) {
  let reqBody = JSON.stringify(newWeatherReport);
  const headers = { "Content-Type": "application/json", Accept: "application/json" }
  fetch("http://localhost:8080/data/", {
      method:"POST",
      mode: "cors",
      credentials: "same-origin",
      headers: headers,
      body: reqBody
  })
  return fetchWeatherData(selectedCity);
}

export function refreshData() {
  return { type: REFRESH_DATA }
}

export function selectCity(city) {

  let dataUrl = weatherDataUrl + city

  return (dispatch) => {
    return getData(dataUrl)
        .then(response => response.json())
        .then(json => dispatch({ type: SELECT_CITY, city, weatherData: json }))
        .catch(err => console.error("ERROR: " + err))
  }
}

export function selectStartDate(startDate) {
    return { type: SELECT_START_DATE, startDate }
}

export function selectEndDate(endDate) {
    return { type: SELECT_END_DATE, endDate }
}

export const fetchWeatherData = (selectedCity = "Horsens") => {
  let dataUrl = weatherDataUrl + selectedCity
  
  console.log("Fetching weather data");

  return (dispatch) => getData(dataUrl)
                      .then(res => res.json())
                      .then(json => dispatch({ type: FETCH_WEATHER_DATA, weatherData: json })) 
}

export const fetchForecastData = (selectedCity = "Horsens") => {
  let forecastUrl = weatherForecastUrl + selectedCity
  
  console.log("Fetch forecast data")

  return (dispatch) => getData(forecastUrl)
                      .then(res => res.json())
                      .then(json => dispatch({ type: FETCH_FORECAST_DATA, forecastData: json })) 
}
