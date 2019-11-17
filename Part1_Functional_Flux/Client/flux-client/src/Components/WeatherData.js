import React from 'react';

class WeatherData extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        type: "",
        value: "",
        unit: "",
        time: "",
        place: "",
    };
  }

    render() {
      
      return (
        <div className="weather-data">
          <h1>Weather Data:</h1>
            <p> Type: {this.props.type} </p>
            <p> Value {this.props.value} </p>
            <p> Unit {this.props.unit} </p>
            <p> Time {this.props.time} </p>
            <p> Place {this.props.place} </p>
        </div>
      );
    }
}

export default WeatherData;
