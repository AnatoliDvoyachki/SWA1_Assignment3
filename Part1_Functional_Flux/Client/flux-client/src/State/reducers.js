import {getDate5DaysAgo,getCurrentDate} from "../util/DateHelpers";

import { combineReducers } from "redux"
import {
    SELECT_CITY,
    SELECT_END_DATE,
    SELECT_START_DATE,
    FETCH_FORECAST_DATA,
    FETCH_WEATHER_DATA,
    ERROR
} from "./actions"

const initialState = {
    selectedCity: "Horsens",
    startDate: getDate5DaysAgo(),
    endDate: getCurrentDate(),
    weatherData: [],
    forecastData: [],
    error: ""
  }

function weatherData(state = initialState,action){
    switch(action.type) {
      case FETCH_FORECAST_DATA:
          return { ...state, forecastData: action.forecastData }
      case FETCH_WEATHER_DATA:
          return { ...state, weatherData: action.weatherData }
      case ERROR:
          return { ...state, error: action.msg }
      case SELECT_CITY:
          return { ...state, selectedCity: action.city, weatherData: action.weatherData, forecastData: action.forecastData }
      case SELECT_START_DATE:
          return { ...state, startDate: action.startDate }
      case SELECT_END_DATE:
          return { ...state, endDate: action.endDate }
      default: 
          return state;
    }
}

const weatherDataApp = combineReducers({
  weatherData
})

export default weatherDataApp
