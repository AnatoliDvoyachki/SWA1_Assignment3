import React from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
export default class StartEndDateSelector extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };
 
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
 
  render() {
    return (
    <div>
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
    );
  }
}