import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import getWeatherData from './util/ServerCommunicator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('communicates to the server', async done => {
    const weatherDataUrl = 'http://localhost:8080/data/'
    const res = await fetch(weatherDataUrl)
    expect(res.status).toBe(200)
  done()
});
