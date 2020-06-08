import AppState from './AppState';
import UiState from './UiState';

export type ILocation = {
  location?: Location;
};

export type IRootStore = {
  store: RootStore;
};
export const storeDefaultProps = { store: (null as unknown) as RootStore };
export const locationDefaultProps = { location: (null as unknown) as Location };

class RootStore {
  appStore: AppState;
  uiStore: UiState;

  constructor() {
    this.appStore = new AppState(this);
    this.uiStore = new UiState(this);
  }
}

export default RootStore;
