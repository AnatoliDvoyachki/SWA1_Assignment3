import React from "react";

class WeatherPredictionData extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {   
      return (
        <div className="weather-prediction-data">
            <p> From: {this.props.from}, To: {this.props.to}, Type: {this.props.type}, Unit {this.props.unit}, Time {this.props.time}, Place {this.props.place}</p>
        </div>
      );
    }
}

export default WeatherPredictionData;
