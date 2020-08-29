import React from 'react';

import {
  Temperature,
  AirPressure,
  Humidity,
  DisplayObjectState
} from './types';
import { AnalyticsContext } from './AnalyticsContext';

import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  static contextType = AnalyticsContext;
  headerInterval: any = null;

  state: DisplayObjectState = {
    temparature: 'N/A',
    air_pressure: 'N/A',
    humidity: 'N/A',
    tempTimer: 0,
    airTimer: 0,
    humidityTimer: 0
  }

  componentDidMount () {

    //initiate socket connection
    this.context.init();

    const temparatureObservable = this.context.onTemparature();
    const airObservable = this.context.onAirPressure();
    const humidityObservable = this.context.onHumidity();

    temparatureObservable.subscribe((data: Temperature) => {
      this.setState({
        temparature: data.temparature,
        tempTimer: 0
      });
    });
    airObservable.subscribe((data: AirPressure) => {
      this.setState({
        air_pressure: data.air_pressure,
        airTimer: 0
      });
    });
    humidityObservable.subscribe((data: Humidity) => {
      this.setState({
        humidity: data.humidity,
        humidityTimer: 0
      });
    });

    this.headerInterval = setInterval(this.handleTimer, 100);
  }

  componentWillUnmount () {
    this.context.disconnect();

    if (this.headerInterval) {
      clearInterval(this.headerInterval);
    }
  }

  handleTimer = () => {
    const { tempTimer, airTimer, humidityTimer } = this.state;
    let state = {};
    if (tempTimer > 10) {
      state = {
        ...state,
        tempTimer: 0,
        temparature: 'N/A'
      };
    }
    if (airTimer > 10) {
      state = {
        ...state,
        airTimer: 0,
        air_pressure: 'N/A'
      };
    }
    if (humidityTimer > 10) {
      state = {
        ...state,
        humidityTimer: 0,
        humidity: 'N/A'
      };
    }
    this.setState({
      tempTimer: tempTimer + 1,
      airTimer: airTimer + 1,
      humidityTimer: humidityTimer + 1,
      ...state
    });
  };

  render () {
    const {
      temparature,
      air_pressure,
      humidity
    } = this.state;

    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="App-medical">
          <p>Temperature: {temparature}</p>
          <p>Air Pressure: {air_pressure}</p>
          <p>Humidity: {humidity}</p>
        </div>
      </div>
    );
  }
}

export default App;
