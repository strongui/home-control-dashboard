import { History } from 'history';
import AppState from './AppState';
import UiState from './UiState';

export type IRootStore = {
  store: RootStore;
};
export const storeDefaultProps = { store: (null as unknown) as RootStore };

export type IRouting = {
  routing: { history: History; location: Location };
};
export const routingDefaultProps = {
  routing: ({} as unknown) as { history: History; location: Location },
};

class RootStore {
  appStore: AppState;
  uiStore: UiState;

  constructor() {
    this.appStore = new AppState(this);
    this.uiStore = new UiState(this);
  }
}

export default RootStore;
