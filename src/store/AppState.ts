const mobx = require('mobx');
const { action, computed, configure, decorate, observable } = mobx;

import { IChartCardProps } from '../components/content/ChartCard';
import { IForecastObj, IWeatherStationObj } from '../components/content/WeatherStation';
import { IIconCardProps } from '../components/content/IconCard';
import { ILightSwitch } from '../components/content/LightSwitch';
import { INotification } from '../components/header/Notification';
import { IAppState } from './AppState';
import doLogin from './actions/doLogin';
import sync from './actions/sync';
import syncWeather from './actions/syncWeather';

// don't allow state modifications outside actions
configure({ enforceActions: true });

export type IDismissNotification = (notification: string, id: number) => void;

export interface IGenericObj {
  id: number;
  key: string;
  value: any;
}

export interface IUserObj {
  error?: string;
  lastname?: string;
  loggedIn: boolean;
  name?: string;
  sex?: string;
  username?: string;
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
  isLoggedIn: boolean;
  lights?: ILightSwitch[];
  loadWeather: () => void;
  login: (username: string, password: string, forceFail?: boolean) => Promise<IUserObj>;
  logout: () => Promise<void>;
  messages?: INotification[];
  setValue: (objKey: string, ident: string, id: number, value: any) => void;
  status: string;
  syncStateWithServer: (latency?: number) => void;
  user?: IUserObj;
  userFullName: () => string;
  weather: IWeather;
}

class AppState {
  rootStore: IAppState;

  alerts: INotification[];
  chartCards: IChartCardProps[];
  chartCardsControlled: IChartCardProps[];
  controlsInitialized = false;
  iconCards: IIconCardProps[];
  iconCardsMonitored: IIconCardProps[];
  lights: ILightSwitch[];
  messages: INotification[];
  status = 'offline';
  user: IUserObj = { loggedIn: localStorage.getItem('hccLoggedIn') === 'true' ? true : false };
  weather: IWeather = { loaded: false, updating: false };

  constructor(rootStore: IAppState) {
    this.dismissNotification = this.dismissNotification.bind(this);
    this.loadWeather = this.loadWeather.bind(this);
    this.login = this.login.bind(this);
    this.rootStore = rootStore;
    this.setValue = this.setValue.bind(this);
    this.syncStateWithServer = this.syncStateWithServer.bind(this);
  }

  get userFullName() {
    return this.user ? `${this.user.name} ${this.user.lastname}` : '';
  }

  get isLoggedIn() {
    return this.user && this.user.loggedIn;
  }

  login(username: string, password: string, forceFail?: boolean) {
    return new Promise((resolve, reject) => {
      doLogin(username, password, forceFail).then(response => {
        action('Login User', () => {
          this.user = response;
        })();
        resolve(response);
      });
    });
  }

  logout() {
    window.localStorage.setItem('hccLoggedIn', 'false');
    this.user = { loggedIn: false };
    return Promise.resolve();
  }

  setValue(objKey: string, ident: string, id: number, value: any) {
    // tslint:disable-next-line no-console
    console.log('%cPosting new values to server!', 'color: white; background-color: #26c6da ');
    // tslint:disable-next-line no-console
    console.log(
      '%c' + `${ident} is changing to ${value}`,
      'color: white; background-color: #33b5e5 ',
    );
    // tslint:disable-next-line no-console
    console.dir({ objKey, ident, id, value });
    // tslint:disable-next-line no-console
    console.log('******************');

    this[objKey] = this[objKey].map(
      (obj: IGenericObj) => (obj.id === id ? { ...obj, value } : obj),
    );
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

        action('Sync Weather', () => {
          this.weather.currentWeather = currentWeather;
          this.weather.error = null;
          this.weather.forecast = forecast;
          this.weather.lastUpdate = now.valueOf();

          this.weather.loaded = true;
          this.weather.updating = false;
        })();
      })
      .catch(err => {
        action('Sync Weather Failed', () => {
          this.weather.error = err;
          this.weather.loaded = true;
          this.weather.updating = false;
        })();
      });
  }

  syncStateWithServer(latency?: number) {
    sync(latency).then(response => {
      const {
        alerts,
        chartCards,
        chartCardsControlled,
        iconCards,
        iconCardsMonitored,
        lights,
        messages,
        status,
      } = response;

      action('Sync State With Server', () => {
        this.alerts = alerts;
        this.chartCards = chartCards;
        this.chartCardsControlled = chartCardsControlled;
        this.iconCards = iconCards;
        this.iconCardsMonitored = iconCardsMonitored;
        this.lights = lights;
        this.messages = messages;
        this.status = status;

        this.controlsInitialized = true;
      })();
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
  isLoggedIn: computed,
  lights: observable,
  loadWeather: action,
  login: action,
  logout: action,
  messages: observable,
  setValue: action,
  status: observable,
  syncStateWithServer: action,
  user: observable,
  userFullName: computed,
  weather: observable,
});
