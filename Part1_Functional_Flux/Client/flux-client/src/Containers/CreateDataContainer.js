import React from 'react'
import { connect } from 'react-redux'
import { createData, selectCity } from '../State/actions'


let CreateData = ({ selectedCity,dispatch }) => {
    
  
    return (
    <div>
      <button onClick={e => onCreateReportClicked(selectedCity, dispatch)}>Create Data</button>
    </div>
  )
}

const onCreateReportClicked = (selectedCity, dispatch) => {
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

  dispatch(createData(newWeatherReport,selectedCity));
}

const mapStateToProps = state => {
  return {
    selectedCity: state.selectedCity
  }
}

CreateData = connect(mapStateToProps)(CreateData)
export default CreateData

