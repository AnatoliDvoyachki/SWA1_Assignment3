import React from 'react'
import { connect } from 'react-redux'
import { selectStartDate, selectEndDate } from '../State/actions'
import PropTypes from 'prop-types'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const mapStateToProps = state => {
    return {
      startDate: state.startDate,
      endDate: state.endDate
    }
  }

let SelectDate = ({ startDate, endDate ,dispatch }) => {
    return (
      <div>
          <p>Select time interval:</p>
            <p> Start Date: </p>
            <DatePicker
                selected={startDate}
                onChange={e => dispatch(selectStartDate(e.value))}/>
            <p> End Date: </p>
            <DatePicker
                selected={endDate}
                onChange={e => dispatch(selectEndDate(e.value))}/>
        </div>
  )

  
}



SelectDate = connect(mapStateToProps)(SelectDate)
export default SelectDate

