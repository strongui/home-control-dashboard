import AppState, { IAppState } from './AppState';
import UiState, { IUiState } from './UiState';

export interface IAppState {
  appStore: IAppState;
  uiStore: IUiState;
}

class RootStore {
  appStore: IAppState;
  uiStore: IUiState;

  constructor() {
    this.appStore = new (AppState as any)(this);
    this.uiStore = new (UiState as any)(this);
  }
}

export default RootStore;
