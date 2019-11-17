import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const towns = [ "Aarhus","Horsens","Copenhagen" ]

const stateOptions = _.map(towns, (state, index) => ({
  key: towns[index],
  text: state,
  value: towns[index],
}))



class DropdownTest extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
  }

render() {
  
  return (
    <div className="App">
      <Dropdown placeholder='Town' search selection options={stateOptions} />
    </div>
  );
}


}

export default DropdownTest;
