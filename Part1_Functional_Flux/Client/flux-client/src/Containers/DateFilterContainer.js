import React from "react"
import { connect } from "react-redux"
import { selectStartDate, selectEndDate } from "../State/actions"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

let SelectDate = ({ startDate, endDate, dispatch }) => {
    return (
      <div>
          <p>Select time interval:</p>
            <p> Start Date: </p>
            <DatePicker
                selected={startDate}
                onChange={e => startDateSelected(e, dispatch)}/>
            <p> End Date: </p>
            <DatePicker
                selected={endDate}
                onChange={e => endDateSelected(e, dispatch)}/>
        </div>
  )
}

const startDateSelected = (date, dispatch) => {
  dispatch(selectStartDate(date))
}

const endDateSelected = (date, dispatch) => {
  dispatch(selectEndDate(date))
}

const mapStateToProps = state => {
  return {
    startDate: state.startDate,
    endDate: state.endDate
  }
}

SelectDate = connect(mapStateToProps)(SelectDate)

export default SelectDate
