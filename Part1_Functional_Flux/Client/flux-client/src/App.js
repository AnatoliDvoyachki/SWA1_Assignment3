import React from 'react';
import './App.css';
import WeatherData from './Components/WeatherData';
import DropdownTest from './Components/DropdownTest';
import StartEndDateSelector from './Components/StartEndDateSelector';


import { getLatestDataOfEachType,getMinTemperature,
  getMaxTemperature,getTotalPrecipitation,getAverageWindSpeed,
  getAverageCloudCoverage,getDominantWindDirection,
  getWeatherForecastData} from './util/WeatherDataHelpers';

import { getData,weatherDataUrl,weatherForecastUrl }
 from './util/ServerCommunicator';
import { getDate5DaysAgo, getCurrentDate } from './util/DateHelpers';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        latestDataOfEachType: {},
        minimumTemperatureData: null,
        maximumTemperatureData: null,
        totalPrecipitation: null,
        averageWindSpeed: null,
        averageCloudCoverage: null,
        dominantWindDirection: null,
        weatherPredictions: null
    };
    this.loadData();
  }

render() {
  let latestDataOfEachType = this.state.latestDataOfEachType
  console.log(latestDataOfEachType[1]);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Select City:</p>
          <DropdownTest/>
        </div>

        <div>
          <p>Select time interval:</p>
          <StartEndDateSelector/>
        </div>

        <div>
          <p>Weather Data:</p>
        </div>
        
      </header>
    </div>
  );
}
//{latestDataOfEachType.map(wd => <WeatherData/>)}
mapObjToWeatherData(){

}

  async loadData
  (cityName = "",fromDate = getDate5DaysAgo(), toDate = getCurrentDate()) {
      
    let dataUrl = weatherDataUrl + cityName
    let forecastUrl = weatherForecastUrl + cityName

    let res = await getData(dataUrl);
    let weatherData = await res.json();
    console.log(weatherData)
    //console.log(weatherData.find(wd => is(wd, "precipitation")))

    let latestWeatherData = getLatestDataOfEachType(fromDate,toDate,weatherData);
    let minTempData = getMinTemperature(fromDate,toDate,weatherData);
    let maxTempData = getMaxTemperature(fromDate,toDate,weatherData);
    let totalPrec = getTotalPrecipitation(fromDate,toDate,weatherData);
    let avgWindSpeed = getAverageWindSpeed(fromDate,toDate,weatherData);
    let avgCloudCoverage = getAverageCloudCoverage(fromDate,toDate,weatherData);
    let newDominantWindDirection = getDominantWindDirection(fromDate,toDate,weatherData);
    let newWeatherPredictions = getWeatherForecastData(fromDate,toDate,weatherData);

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

      console.log(this.state.latestDataOfEachType)
      console.log(this.state.latestDataOfEachType.latestPrecipitation)
  }
}

export default App;
