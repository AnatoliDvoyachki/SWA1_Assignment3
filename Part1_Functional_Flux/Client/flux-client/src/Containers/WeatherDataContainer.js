import React from 'react';
import WeatherData from '../Components/WeatherData';


import { getLatestDataOfEachType,getMinTemperature,
  getMaxTemperature,getTotalPrecipitation,getAverageWindSpeed,
  getAverageCloudCoverage,getDominantWindDirection,
  getWeatherForecastData} from '../util/WeatherDataHelpers';

import { getData,weatherDataUrl,weatherForecastUrl }
 from '../util/ServerCommunicator';
import { getDate5DaysAgo, getCurrentDate } from '../util/DateHelpers';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class WeatherDataContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        selectedCity: "",
        startDate: getDate5DaysAgo(),
        endDate: getCurrentDate(),
        latestDataOfEachType: [],
        minimumTemperatureData: null,
        maximumTemperatureData: null,
        totalPrecipitation: null,
        averageWindSpeed: null,
        averageCloudCoverage: null,
        dominantWindDirection: null,
        weatherPredictions: null
    };
    //this.initializeDates();
    this.loadData();

  }

render() {
  let latestDataOfEachType = this.state.latestDataOfEachType
  console.log(latestDataOfEachType[1]);
  return (
    <div className="App">
      <header className="App-header">

        <div> 
            <select value = {this.state.selectedCity}
                onChange={(e) => this.handleCitySelected(e)}
                >
                <option value="" disabled>Select City</option>
                <option value="Horsens">Horsens</option>
                <option value="Aarhus">Aarhus</option>
                <option value="Copenhagen">Copenhagen</option>
            </select>
        </div>

        <div>
          <p>Select time interval:</p>
            <p> Start Date: </p>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleStartDateChange}
            />
            <p> End Date: </p>
            <DatePicker
                selected={this.state.endDate}
                onChange={this.handleEndDateChange}
            />
        </div>

        <div>
          <p>Latest Weather Data:</p>
          {this.mapWeatherDataObjects(this.state.latestDataOfEachType)}
        </div>
        
      </header>
    </div>
  );
}

handleCitySelected(val){
this.setState({
    selectedCity: val.target.value
  });
}
handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };
  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };

  async loadData() {
    
    let cityName = this.state.selectedCity
    let fromDate = this.state.startDate;
    let toDate = this.state.endDate;

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

  initializeDates(){
    this.setState({
        startDate: getDate5DaysAgo(),
        endDate: getCurrentDate()
    })
  }
  mapWeatherDataObjects(data){
    /*return (
    <div>
        {data.map(weatherData => 
            <WeatherData 
            type = {weatherData.type}
            value = {weatherData.value}
            unit = {weatherData.unit}
            time = {weatherData.time}
            place = {weatherData.place}
            />
        )}
    </div>
    )*/
  }
}

export default WeatherDataContainer;