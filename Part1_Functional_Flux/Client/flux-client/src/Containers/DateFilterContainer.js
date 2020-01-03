import React from 'react'
import { connect } from 'react-redux'
import { selectStartDate, selectEndDate } from '../State/actions'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
    return {
      selectedStartDate: state.selectedStartDate,
      selectedEndDate: state.selectedEndDate
    }
  }

let SelectDate = ({ selectedStartDate, selectedEndDate ,dispatch }) => {
    return (
      <div>
          <p>Select time interval:</p>
            <p> Start Date: </p>
            <DatePicker
                selected={selectedStartDate}
                onChange={e => dispatch(selectStartDate(e.target.value))}/>
            <p> End Date: </p>
            <DatePicker
                selected={selectedEndDate}
                onChange={e => dispatch(selectEndDate(e.target.value))}/>
        </div>
  )

  
}



SelectDate = connect(mapStateToProps)(SelectDate)
export default SelectDate

