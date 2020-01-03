import React from 'react'
import { connect } from 'react-redux'
import { selectCity } from '../State/actions'
import PropTypes from 'prop-types'

//      prop:   weatherPredictions: []
const mapStateToProps = state => {
    return {
      selectedCity: state.selectedCity
    }
  }

let SelectCity = ({ selectedCity,dispatch }) => {
    
  
    return (
    <div>
     <select value = {selectedCity} onChange={(e) => dispatch(selectCity(e.target.value))}>
        <option value="" disabled>Select City</option>
        <option value="Horsens">Horsens</option>
        <option value="Aarhus">Aarhus</option>
        <option value="Copenhagen">Copenhagen</option>
     </select>
    </div>
  )

  
}

const onCreateReportClicked = () => {
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

    
  }
SelectCity = connect(mapStateToProps)(SelectCity)
export default SelectCity
