import React from 'react';
import './App.css';
import { showLatestWeatherData,showMinimumTemperatureWeatherData,
    showMaximumTemperatureWeatherData, getTotalPrecipitation,
    getAverageWindSpeed, getAverageCloudCoverage,
    getDominantWindDirection} from './WeatherDataHelpers';

const weatherDataUrl = 'http://localhost:8080/data/'
const weatherForecastUrl = 'http://localhost:8080/forecast/'

class WeatherData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latestDataOfEachType: null,
            minimumTemperatureData: null,
            maximumTemperatureData: null,
            totalPrecipitation: null,
            averageWindSpeed: null,
            averageCloudCoverage: null,
            dominantWindDirection: null,
            weatherPredictions: null
        };
      }

    render() {
      return (
        <div className="weather-data">
          <h1>Weather Data:</h1>
        </div>
      );
    }


    async loadData(cityName) {
        
        if (cityName != null) {
            weatherDataUrl += cityName
            weatherForecastUrl += cityName
        }
  
        console.log(weatherDataUrl)
        console.log(weatherForecastUrl)
  
        let weatherData = await fetch(weatherDataUrl)
        let weatherPredictionData = await fetch(weatherForecastUrl)

        let latestWeatherData = showLatestWeatherData("",weatherData);
        let minTempData = showMinimumTemperatureWeatherData("",weatherData);
        let maxTempData = showMaximumTemperatureWeatherData("",weatherData);
        let totalPrec = showTotalPrecipitation("",weatherData);
        let avgWindSpeed = showAverageWindSpeed(weatherData);
        let avgCloudCoverage = showAverageCloudCoverage(weatherData);
        let newDominantWindDirection = showDominantWindDirection(weatherData);
        let newWeatherPredictions = showWeatherForecastData(weatherData);

        this.setState({
            latestDataOfEachType : latestWeatherData,
            minimumTemperatureData: minTempData,
            maximumTemperatureData: maxTempData,
            totalPrecipitation: totalPrec,
            averageWindSpeed: avgWindSpeed,
            averageCloudCoverage: avgCloudCoverage,
            dominantWindDirection: newDominantWindDirection,
            weatherPredictions: newWeatherPredictions
          });

  }

}


export default WeatherData;
