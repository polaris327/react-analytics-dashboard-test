import * as express from 'express';
import * as socketIo from 'socket.io';
import { AnalyticsEvent } from './constants';
import { createServer, Server } from 'http';
var cors = require('cors');

const getRandomSeconds = (min: number, max: number) => {
  const randomValue = min + Math.random() * (max - min);
  return Math.round(randomValue);
}

export class AnalyticsServer {
  public static readonly PORT: number = 8080;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor () {
    this._app = express();
    this.port = process.env.PORT || AnalyticsServer.PORT;
    this._app.use(cors());
    this._app.options('*', cors());
    this.server = createServer(this._app);
    this.initSocket();
    this.listen();
  }

  private initSocket (): void {
    this.io = socketIo(this.server);
  }

  private listen (): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on(AnalyticsEvent.CONNECT, (socket: any) => {
      console.log('Connected client on port %s.', this.port);
      socket.enableTimeInterval = true;

      const randomTemparature = () => {
        const temparature = Math.round((Math.random() * 28 + 24) * 100) / 100;

        if (socket.enableTimeInterval) {
          setTimeout(() => {
            socket.emit(AnalyticsEvent.TEMPERATURE, { temparature });
            randomTemparature();
          }, getRandomSeconds(100, 2000));
        }
      };

      const randomAirPressure = () => {
        const air_pressure = Math.round((Math.random() * 28 + 24) * 100) / 100;

        if (socket.enableTimeInterval) {
          setTimeout(() => {
            socket.emit(AnalyticsEvent.AIRPRESSURE, { air_pressure });
            randomAirPressure();
          }, getRandomSeconds(100, 2000));
        }
      };

      const randomHumidity = () => {
        const humidity = Math.round((Math.random() * 28 + 24) * 100) / 100;
        if (socket.enableTimeInterval) {
          setTimeout(() => {
            socket.emit(AnalyticsEvent.HUMIDITY, { humidity });
            randomHumidity();
          }, getRandomSeconds(100, 2000));
        }
      };

      randomTemparature();
      randomAirPressure();
      randomHumidity();

      socket.on(AnalyticsEvent.DISCONNECT, () => {
        console.log('Client disconnected');
        socket.enableTimeInterval = false;
      });
    });
    this.io.on(AnalyticsEvent.DISCONNECT, () => {
    });
  }

  get app (): express.Application {
    return this._app;
  }
}
