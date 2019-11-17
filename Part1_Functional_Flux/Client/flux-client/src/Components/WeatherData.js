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
            <p> Type: {this.props.type},  Value {this.props.value}, Unit {this.props.unit}, Time {this.props.time}, Place {this.props.place}   </p>
        </div>
      );
    }
}

export default WeatherData;
