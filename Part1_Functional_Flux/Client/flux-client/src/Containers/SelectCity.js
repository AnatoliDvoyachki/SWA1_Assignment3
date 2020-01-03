import React from 'react'
import { connect } from 'react-redux'
import { selectCity } from '../State/actions'


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


SelectCity = connect(mapStateToProps)(SelectCity)
export default SelectCity

