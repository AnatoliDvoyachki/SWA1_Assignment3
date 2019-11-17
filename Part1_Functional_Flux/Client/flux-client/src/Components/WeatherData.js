import React from 'react';



class WeatherData extends React.Component {

/*
  constructor(props) {
    super(props);
    /*this.state = {
        type: "",
        value: "",
        unit: "",
        time: "",
        place: "",
    };
  }*/

    render() {
      
      return (
        <div className="weather-data">
          <h1>Weather Data:</h1>
            {this.props.type}
            {this.props.value}
            {this.props.unit}
            {this.props.time}
            {this.props.place}
        </div>
      );
    }
}


export default WeatherData;
/*

<p>{this.state.latestDataOfEachType}</p>
          <p>{this.state.minimumTemperatureData}</p>
          <p>{this.state.latestDataOfEachType}</p>
          <p>{this.state.latestDataOfEachType}</p>*/

          
