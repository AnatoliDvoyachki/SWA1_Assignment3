import React from 'react';

class WeatherPredictionData extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        from: 0,
        to: 0,
        type: "",
        unit: "",
        time: "",
        place: "",
    };
  }

    render() {
      
      return (
        <div className="weather-prediction-data">
            <p> From: {this.state.from}, To: {this.state.to}, Type: {this.props.type}, Unit {this.props.unit}, Time {this.props.time}, Place {this.props.place}</p>
        </div>
      );
    }
}

export default WeatherPredictionData;
