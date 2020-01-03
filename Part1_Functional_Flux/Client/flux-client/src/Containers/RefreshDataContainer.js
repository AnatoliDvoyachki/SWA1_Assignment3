import React from 'react'
import { connect } from 'react-redux'
import { fetchForecastData, fetchWeatherData } from '../State/actions'

let RefreshDataContainer = ({ selectedCity,dispatch }) => {
    
  
    return (
    <div>
     <button onClick={e => handleClick(selectedCity,dispatch)}></button>
    </div>
  )


  
}
const handleClick = (selectedCity,dispatch) => {
  console.log("Refreshing data...")
  dispatch(fetchForecastData(selectedCity))
  dispatch(fetchWeatherData(selectedCity))
}
const mapStateToProps = state => {
  return {
    selectedCity: state.selectedCity
  }
}

RefreshDataContainer = connect(mapStateToProps)(RefreshDataContainer)
export default RefreshDataContainer

