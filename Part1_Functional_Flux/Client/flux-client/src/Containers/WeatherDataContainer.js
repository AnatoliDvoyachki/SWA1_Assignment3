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

import "react-datepicker/dist/react-datepicker.css";



class WeatherDataContainer extends React.Component{
  /*constructor(props) {
    super(props);
    this.state = {
        startDate: getDate5DaysAgo(),
        endDate: getCurrentDate(),
        latestDataOfEachType: [],
        minimumTemperatureData: {},
        maximumTemperatureData: {},
        totalPrecipitation: 0,
        averageWindSpeed: 0,
        averageCloudCoverage: 0,
        dominantWindDirection: "",

    };
    this.loadData();

  }*/

render() {
  //let latestDataOfEachType = this.state.latestDataOfEachType
  //let weatherPredictions = this.state.weatherPredictions
  return (
    <div className="App">
      <header className="App-header">


        <div>
          <p>Latest Weather Data:</p>
            {this.renderDataForEachType()}
        </div>
        <div> 
            <p> Minimum temperature recorded within the selected date interval:</p>
            {this.renderMinimumTemperatureData()}

        </div>
        <div> 
            <p> Maximum temperature recorded within the selected date interval:</p>
            {this.renderMaximumTemperatureData()}
        </div>
        
        
      </header>
    </div>
  );
}

renderMinimumTemperatureData(){
  let mimumimTemperatureData = getMinTemperature(this.props.startDate,this.props.endDate,this.props.weatherData)

  return (
    <div>
      <WeatherData
            
             type = {mimumimTemperatureData.type}
             value = {mimumimTemperatureData.value}
             unit = {mimumimTemperatureData.unit}
             time = {mimumimTemperatureData.time}
             place = {mimumimTemperatureData.place}
            />
    </div>
  )
}

renderMaximumTemperatureData(){
  let maximumTemperatureData = getMaxTemperature(this.props.startDate,this.props.endDate,this.props.weatherData)

  return (
    <div>
      <WeatherData
            
             type = {maximumTemperatureData.type}
             value = {maximumTemperatureData.value}
             unit = {maximumTemperatureData.unit}
             time = {maximumTemperatureData.time}
             place = {maximumTemperatureData.place}
            />
    </div>
  )
}

renderDataForEachType(){
  let valuesForEachType = getLatestDataOfEachType(this.props.startDate,this.props.endDate,this.props.weatherData)
  return Object.keys(valuesForEachType).map((value,index) =>{
    if(valuesForEachType[value] !== undefined)
    {
      return (
        <WeatherData 
            type = {valuesForEachType[value].type}
            value = {valuesForEachType[value].value}
            unit = {valuesForEachType[value].unit}
            time = {valuesForEachType[value].time}
            place = {valuesForEachType[value].place}
            key={index}
        />
      )
    }
  })
}

/*
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

    //let latestWeatherData = getLatestDataOfEachType(fromDate,toDate,weatherData);
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
*/
  

}

export default WeatherDataContainer;


