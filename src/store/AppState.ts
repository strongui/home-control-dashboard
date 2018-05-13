import { action, computed, decorate, observable } from 'mobx';
import { IChartCardProps } from '../components/content/ChartCard';
import { IIconCardProps } from '../components/content/IconCard';
import { INotification } from '../components/header/Notification';
import sync from './actions/sync';

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

export interface IAppState {
  alerts?: INotification[];
  chartCards?: IChartCardProps[];
  chartCardsControlled?: IChartCardProps[];
  controlsInitialized: boolean;
  dismissNotification: (notification: string, id: number) => void;
  iconCards?: IIconCardProps[];
  iconCardsMonitored?: IIconCardProps[];
  messages?: INotification[];
  setValue: (objKey: string, ident: string, id: number, value: any) => void;
  status: string;
  syncStateWithServer: (latency?: number) => void;
  user?: IUserObj;
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

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this.dismissNotification = this.dismissNotification.bind(this);
    this.setValue = this.setValue.bind(this);
    this.syncStateWithServer = this.syncStateWithServer.bind(this);
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
  messages: observable,
  setValue: action,
  status: observable,
  syncStateWithServer: action,
  user: observable,
  userFullName: computed,
});
