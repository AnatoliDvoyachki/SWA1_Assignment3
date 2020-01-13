import React from "react";
import WeatherData from "../Components/WeatherData";
import WeatherDataPrediction from "../Components/WeatherPredictionData"
import { getLatestDataOfEachType, getMinTemperature,
  getMaxTemperature, getTotalPrecipitation, getAverageWindSpeed,
  getAverageCloudCoverage, getDominantWindDirection, getWeatherForecastData} from "../util/WeatherDataHelpers";

class WeatherDataContainer extends React.Component{
render() {

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
        <div> 
        <p> Total precipitation within the selected date interval:
           {getTotalPrecipitation(this.props.startDate,this.props.endDate,this.props.weatherData)}</p>
        </div>
        <div> 
            <p> Average wind speed within the selected date interval: 
              {getAverageWindSpeed(this.props.startDate,this.props.endDate,this.props.weatherData)}</p>
        </div>
        <div>
            <p> Average cloud coverage within the selected date interval:
               {getAverageCloudCoverage(this.props.startDate,this.props.endDate,this.props.weatherData)}</p> 
        </div>
        <div>
            <p> Dominant wind direction within the selected date interval:
               {getDominantWindDirection(this.props.startDate,this.props.endDate,this.props.weatherData)}</p> 
        </div>
        <div>
            <p> Hourly temperature prediction within the selected date interval:</p>
            {this.renderWeatherPredictions()}
        </div>
      </header>
    </div>
  );
}

renderWeatherPredictions(){
  let forecastData = getWeatherForecastData(this.props.startDate,this.props.endDate,this.props.forecastData) ;
  if (forecastData){
     return Object.keys(forecastData).map((keyName, i) =>{
       return (
              <WeatherDataPrediction 
                  from = {forecastData[keyName].from}
                  to = {forecastData[keyName].to}
                  type = {forecastData[keyName].type}
                  unit = {forecastData[keyName].unit}
                  time = {forecastData[keyName].time}
                  place = {forecastData[keyName].place}
                  key={i}
              />
      )
  })
  }
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
}

export default WeatherDataContainer;
