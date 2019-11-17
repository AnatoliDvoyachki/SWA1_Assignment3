import React from 'react';
import WeatherData from '../Components/WeatherData';
import WeatherDataPrediction from '../Components/WeatherPredictionData'


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
        minimumTemperatureData: {},
        maximumTemperatureData: {},
        totalPrecipitation: 0,
        averageWindSpeed: 0,
        averageCloudCoverage: 0,
        dominantWindDirection: "",
        weatherPredictions: []
    };
    this.loadData();

  }

render() {
  let latestDataOfEachType = this.state.latestDataOfEachType
  let weatherPredictions = this.state.weatherPredictions
  return (
    <div className="App">
      <header className="App-header">

        <div> 
            <button onClick={e => this.onCreateReportClicked()}>Create Data</button>
            <button onClick={e => this.loadData()}>Refresh Data</button>
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
            {
                Object.keys(latestDataOfEachType).map((keyName, i) =>{
                    return (
                            <WeatherData 
                                type = {latestDataOfEachType[keyName].type}
                                value = {latestDataOfEachType[keyName].value}
                                unit = {latestDataOfEachType[keyName].unit}
                                time = {latestDataOfEachType[keyName].time}
                                place = {latestDataOfEachType[keyName].place}
                                key={i}
                            />
                    )
                })
            }
        </div>
        <div> 
            <p> Minimum temperature recorded within the selected date interval:</p>
            <WeatherData
             type = {this.state.minimumTemperatureData.type}
             value = {this.state.minimumTemperatureData.value}
             unit = {this.state.minimumTemperatureData.unit}
             time = {this.state.minimumTemperatureData.time}
             place = {this.state.minimumTemperatureData.place}
            />

        </div>
        <div> 
            <p> Maximum temperature recorded within the selected date interval:</p>
            <WeatherData
             type = {this.state.maximumTemperatureData.type}
             value = {this.state.maximumTemperatureData.value}
             unit = {this.state.maximumTemperatureData.unit}
             time = {this.state.maximumTemperatureData.time}
             place = {this.state.maximumTemperatureData.place}
            />
        </div>
            <p> Total precipitation within the selected date interval: {this.state.totalPrecipitation}</p>
        <div> 
        </div>
            <p> Average wind speed within the selected date interval: {this.state.averageWindSpeed}</p>
        <div> 
        </div>
            <p> Average cloud coverage within the selected date interval: {this.state.averageCloudCoverage}</p>
        <div> 
        </div>
            <p> Dominant wind direction within the selected date interval: {this.state.dominantWindDirection}</p>
        <div> 
        </div>
            <p> Hourly temperature prediction within the selected date interval:</p>
            {
                Object.keys(weatherPredictions).map((keyName, i) =>{
                    return (
                            <WeatherDataPrediction 

                                from = {weatherPredictions[keyName].from}
                                to = {weatherPredictions[keyName].to}
                                type = {weatherPredictions[keyName].type}
                                unit = {weatherPredictions[keyName].unit}
                                time = {weatherPredictions[keyName].time}
                                place = {weatherPredictions[keyName].place}
                                key={i}
                            />
                    )
                })
            }
        
      </header>
    </div>
  );
}

handleCitySelected(val){
  this.loadData(this.state.startDate,this.state.endDate,val.target.value);
}
handleStartDateChange = date => {
    this.loadData(date,this.state.endDate,this.state.selectedCity);
  };
  handleEndDateChange = date => {

    this.loadData(this.state.startDate,date,this.state.selectedCity);
  };

async loadData(startDate = this.state.startDate, endDate = this.state.endDate, selectedCity = this.state.selectedCity) {
    
    let cityName = selectedCity
    let fromDate = startDate;
    let toDate = endDate;

    let dataUrl = weatherDataUrl + cityName
    let forecastUrl = weatherForecastUrl + cityName

    let weatherData = await getData(dataUrl).then(res => res.json());
    let weatherForecastData = await getData(forecastUrl).then(res => res.json());

    let latestWeatherData = getLatestDataOfEachType(fromDate,toDate,weatherData);
    let minTempData = getMinTemperature(fromDate,toDate,weatherData).minTemperature;
    let maxTempData = getMaxTemperature(fromDate,toDate,weatherData).maxTemperature;
    let totalPrec = getTotalPrecipitation(fromDate,toDate,weatherData);
    let avgWindSpeed = getAverageWindSpeed(fromDate,toDate,weatherData);
    let avgCloudCoverage = getAverageCloudCoverage(fromDate,toDate,weatherData);
    let newDominantWindDirection = getDominantWindDirection(fromDate,toDate,weatherData);
    let newWeatherPredictions = getWeatherForecastData(fromDate,toDate,weatherForecastData);


    this.setState({
        latestDataOfEachType : latestWeatherData,
        minimumTemperatureData: minTempData,
        maximumTemperatureData: maxTempData,
        totalPrecipitation: totalPrec,
        averageWindSpeed: avgWindSpeed,
        averageCloudCoverage: avgCloudCoverage,
        dominantWindDirection: newDominantWindDirection,
        weatherPredictions: newWeatherPredictions,
        startDate,
        endDate,
        selectedCity
      });

      
  }

  initializeDates(){
    this.setState({
        startDate: getDate5DaysAgo(),
        endDate: getCurrentDate()
    })
  }
  mapWeatherDataObjects(data){
    Object.keys(data).map((keyName, i) =>{
        return (
            <li className="weatherData" key={i}>
                <WeatherData 
                    type = {data[keyName].type}
                    value = {data[keyName].value}
                    unit = {data[keyName].unit}
                    time = {data[keyName].time}
                    place = {data[keyName].place}
                    key={i}
                />
            </li>
        )
    })
  }

  onCreateReportClicked = () => {
    var type = prompt("Please enter weather data type");
    var time = prompt("Please enter weather data time");
    var place = prompt("Please enter weather data place");
    var value = prompt("Please enter weather data value");
    var unit = prompt("Please enter weather data unit");
    
    let newWeatherReport = 
    [{
        type,
        time,
        place,
        value,
        unit
    }]

    let reqBody = JSON.stringify(newWeatherReport);

    const headers = { "Content-Type": "application/json", Accept: "application/json" }

    fetch("http://localhost:8080/data/", {
        method:'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: headers,
            body: reqBody
            }).then(() => this.loadData())
  }

}

export default WeatherDataContainer;


