import { action, computed, decorate, observable } from 'mobx';
import { IChartCardProps } from '../components/content/ChartCard';
import { IIconCardProps } from '../components/content/IconCard';
import { INotification } from '../components/header/Notification';
import { IForecastObj, IWeatherStationObj } from '../components/content/WeatherStation';
import sync from './actions/sync';
import syncWeather from './actions/syncWeather';

export type IDismissNotification = (notification: string, id: number) => void;

export interface IGenericObj {
  id: number;
  key: string;
  value: any;
}

export interface IUserObj {
  lastname: string;
  loggedIn: boolean;
  name: string;
  sex: string;
  username: string;
}

export interface IWeatherBase {
  currentWeather?: IWeatherStationObj;
  forecast?: IForecastObj;
}

export interface IWeather extends IWeatherBase {
  error?: string | null;
  lastUpdate?: number;
  loaded: boolean;
  store?: IAppState;
  updating: boolean;
}

export interface IAppState {
  alerts?: INotification[];
  chartCards?: IChartCardProps[];
  chartCardsControlled?: IChartCardProps[];
  controlsInitialized: boolean;
  dismissNotification: (notification: string, id: number) => void;
  iconCards?: IIconCardProps[];
  iconCardsMonitored?: IIconCardProps[];
  loadWeather: () => void;
  messages?: INotification[];
  setValue: (objKey: string, ident: string, id: number, value: any) => void;
  status: string;
  syncStateWithServer: (latency?: number) => void;
  user?: IUserObj;
  weather: IWeather;
}

class AppState {
  rootStore: any;

  alerts: INotification[];
  chartCards: IChartCardProps[];
  chartCardsControlled: IChartCardProps[];
  controlsInitialized = false;
  iconCards: IIconCardProps[];
  iconCardsMonitored: IIconCardProps[];
  messages: INotification[];
  status = 'offline';
  user: IUserObj;
  weather: IWeather = { loaded: false, updating: false };

  constructor(rootStore: any) {
    this.dismissNotification = this.dismissNotification.bind(this);
    this.rootStore = rootStore;
    this.setValue = this.setValue.bind(this);
    this.syncStateWithServer = this.syncStateWithServer.bind(this);
    this.loadWeather = this.loadWeather.bind(this);
  }

  get userFullName() {
    return this.user ? `${this.user.name} ${this.user.lastname}` : '';
  }

  setValue(objKey: string, ident: string, id: number, value: any) {
    this[objKey] = this[objKey].map(
      (obj: IGenericObj) => (obj.id === id ? { ...obj, value } : obj),
    );
    // tslint:disable-next-line no-console
    console.log('%cPosting new values to server!', 'color: white; background-color: #26c6da ');
    // tslint:disable-next-line no-console
    console.dir({ objKey, ident, id, value });
  }

  dismissNotification(notification: string, targetId: number) {
    this[notification] = this[notification].filter((obj: INotification) => obj.id !== targetId);
  }

  loadWeather() {
    if (this.weather.updating) return;

    this.weather.updating = true;
    this.weather.error = null;
    syncWeather()
      .then(response => {
        const { currentWeather, forecast } = response;
        const now = new Date();

        this.weather.currentWeather = currentWeather;
        this.weather.error = null;
        this.weather.forecast = forecast;
        this.weather.lastUpdate = now.valueOf();

        this.weather.loaded = true;
        this.weather.updating = false;
      })
      .catch(err => {
        this.weather.error = err;
        this.weather.loaded = true;
        this.weather.updating = false;
      });
  }

  syncStateWithServer(latency?: number) {
    sync(latency).then(response => {
      const {
        alerts,
        chartCards,
        chartCardsControlled,
        controlsInitialized,
        iconCards,
        iconCardsMonitored,
        messages,
        status,
      } = response;

      this.alerts = alerts;
      this.chartCards = chartCards;
      this.chartCardsControlled = chartCardsControlled;
      this.controlsInitialized = controlsInitialized;
      this.iconCards = iconCards;
      this.iconCardsMonitored = iconCardsMonitored;
      this.messages = messages;
      this.status = status;
    });
  }
}

export default decorate(AppState, {
  alerts: observable,
  chartCards: observable,
  chartCardsControlled: observable,
  controlsInitialized: observable,
  dismissNotification: action,
  iconCards: observable,
  iconCardsMonitored: observable,
  loadWeather: action,
  messages: observable,
  setValue: action,
  status: observable,
  syncStateWithServer: action,
  user: observable,
  userFullName: computed,
  weather: observable,
});
