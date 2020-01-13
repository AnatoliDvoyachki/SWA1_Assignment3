import React from "react"
import { connect } from "react-redux"
import { createData } from "../State/actions"


let CreateData = ({ selectedCity,dispatch }) => {
    return (
    <div>
      <button onClick={e => onCreateReportClicked(selectedCity, dispatch)}>Create Data</button>
    </div>
  )
}

const onCreateReportClicked = (selectedCity, dispatch) => {
  let type = prompt("Please enter weather data type");
  let time = prompt("Please enter weather data time");
  let place = prompt("Please enter weather data place");
  let value = prompt("Please enter weather data value");
  let unit = prompt("Please enter weather data unit");
  
  let newWeatherReport = [{ type, time, place, value, unit }]

  dispatch(createData(newWeatherReport, selectedCity));
}

const mapStateToProps = state => {
  return {
    selectedCity: state.selectedCity
  }
}

CreateData = connect(mapStateToProps)(CreateData)
export default CreateData
