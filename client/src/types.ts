export interface Temperature {
  temparature: number;
}

export interface AirPressure {
  air_pressure: number;
}

export interface Humidity {
  humidity: number;
}

export interface DisplayObjectState {
  temparature: number | 'N/A';
  air_pressure: number | 'N/A';
  humidity: number | 'N/A';
  tempTimer: number;
  airTimer: number;
  humidityTimer: number;
}
