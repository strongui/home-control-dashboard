import { action, computed, configure, observable } from 'mobx';
import { IChartCardOwnProps } from '../components/content/ChartCard';
import { IForecastObj, IWeatherStationObj } from '../components/content/WeatherStation';
import { IIconCardOwnProps } from '../components/content/IconCard';
import { ILightSwitch } from '../components/content/LightSwitch';
import { INotification } from '../components/header/Notification';
import doLogin, { arnold } from './actions/doLogin';
import RootStore from '.';
import sync from './actions/sync';
import syncWeather from './actions/syncWeather';

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' });

export type IDismissNotification = (notification: string, id: number) => void;

export interface IGenericObj {
  id: number;
  key: string;
  value: any;
}

export interface IUserObj {
  error?: string | null;
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
  store?: RootStore;
  updating: boolean;
}

export const defaultPosition = {
  lat: 46.8921,
  lon: -71.2732,
};

export const newYorkPosition = {
  lat: 40.73061,
  lon: -73.935242,
};

const getPosition = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLatitude = position.coords.latitude;
          const newLongitude = position.coords.longitude;

          resolve({ lat: newLatitude, lon: newLongitude });
        },
        (error) => {
          console.error(error);
          return resolve(newYorkPosition);
        }
      );
    }
  });
};
export default class AppState {
  rootStore: RootStore;

  @observable alerts: INotification[] = [];
  @observable chartCards: IChartCardOwnProps[] = [];
  @observable chartCardsControlled: IChartCardOwnProps[] = [];
  @observable controlsInitialized = false;
  @observable iconCards: IIconCardOwnProps[] = [];
  @observable iconCardsMonitored: IIconCardOwnProps[] = [];
  @observable lights: ILightSwitch[] = [];
  @observable messages: INotification[] = [];
  @observable status = 'offline';
  @observable user: IUserObj =
    localStorage.getItem('hccLoggedIn') === 'true' ? arnold : { loggedIn: false };
  @observable weather: IWeather = { loaded: false, updating: false };

  constructor(rootStore: RootStore) {
    this.dismissNotification = this.dismissNotification.bind(this);
    this.loadWeather = this.loadWeather.bind(this);
    this.login = this.login.bind(this);
    this.rootStore = rootStore;
    this.setValue = this.setValue.bind(this);
    this.syncStateWithServer = this.syncStateWithServer.bind(this);
  }

  @computed get userFullName() {
    return this.user ? `${this.user.name} ${this.user.lastname}` : '';
  }

  @computed get isLoggedIn() {
    return this.user && this.user.loggedIn;
  }

  @action dismissNotification(notification: 'alerts' | 'messages', targetId: number) {
    this[notification] = this[notification].filter((obj: INotification) => obj.id !== targetId);
  }

  @action loadWeather() {
    if (this.weather.updating) return;

    this.weather.updating = true;
    this.weather.error = null;

    getPosition().then((position) => {
      const { lat, lon } = position;
      syncWeather(lat, lon)
        .then((response) => {
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
        .catch((err) => {
          action('Sync Weather Failed', () => {
            this.weather.error = err;
            this.weather.loaded = true;
            this.weather.updating = false;
          })();
        });
    });
  }

  @action async login(username: string, password: string, forceFail?: boolean) {
    this.user = { ...this.user, error: null };

    const user = await doLogin(username, password, forceFail);
    action('Login User', () => {
      this.user = user;
    })();
    return user;
  }

  @action logout() {
    window.localStorage.setItem('hccLoggedIn', 'false');
    this.user = { loggedIn: false };
    this.controlsInitialized = false;
    return Promise.resolve();
  }

  @action setValue(objKey: string, ident: string, id: number, value: any) {
    console.info('%cPosting new values to server!', 'color: white; background-color: #26c6da;');
    console.info(`%c ${ident} is changing to ${value}`, 'color: white; background-color: #33b5e5;');
    // eslint-disable-next-line no-console
    console.table({ objKey, ident, id, value });
    console.info('******************');

    // @ts-ignore
    this[objKey] = this[objKey].map((obj: IGenericObj) =>
      obj.id === id ? { ...obj, value } : obj
    );
  }

  @action syncStateWithServer(latency?: number) {
    sync(latency).then((response) => {
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
