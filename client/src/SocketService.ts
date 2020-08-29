import io from 'socket.io-client';
import { Temperature, AirPressure, Humidity } from './types';
import { fromEvent, Observable } from 'rxjs';

export class SocketService {
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init (): SocketService {
    console.log('initiating socket service');
    this.socket = io('localhost:8080');
    return this;
  }

  // link temperature event to rxjs data source
  public onTemparature (): Observable<Temperature> {
    return fromEvent(this.socket, 'temperature');
  }

  // link temperature event to rxjs data source
  public onAirPressure (): Observable<AirPressure> {
    return fromEvent(this.socket, 'airpressure');
  }

  // link temperature event to rxjs data source
  public onHumidity (): Observable<Humidity> {
    return fromEvent(this.socket, 'humidity');
  }

  // disconnect - used when unmounting
  public disconnect (): void {
    this.socket.disconnect();
  }
}
