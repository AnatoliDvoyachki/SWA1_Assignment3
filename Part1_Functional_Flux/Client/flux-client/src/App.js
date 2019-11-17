import React from 'react';
import './App.css';
import WeatherDataContainer from './Containers/WeatherDataContainer';

class App extends React.Component{

  render() {
    
    return (
      <div className="App">
        <WeatherDataContainer/>
      </div>
    );
  }

}

export default App;
