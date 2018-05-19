const mobx = require('mobx');
const { action, computed, configure, decorate, observable } = mobx;
import { IAppState } from './AppState';

// don't allow state modifications outside actions
configure({ enforceActions: true });

export interface IUiState {
  appIsInSync: boolean;
  collapseMenu: () => void;
  language: string;
  menuCollapsed: boolean;
  pendingRequestCount: number;
  sidenavToggled: boolean;
  toggleSidenav: () => void;
  windowDimensions: {
    height: number;
    width: number;
  };
}

class UiState {
  rootStore: IAppState;

  language = 'en_US';
  menuCollapsed = true;
  pendingRequestCount = 0;
  sidenavToggled = false;

  // .struct makes sure observer won't be signaled unless the
  // dimensions object changed in a deepEqual manner
  windowDimensions = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  constructor(rootStore: IAppState) {
    this.rootStore = rootStore;
    window.onresize = () => {
      this.windowDimensions = this._windowDimensions;
    };
    this.collapseMenu = this.collapseMenu.bind(this);
    this.toggleSidenav = this.toggleSidenav.bind(this);
  }

  collapseMenu() {
    this.menuCollapsed = !this.menuCollapsed;
    if (this.sidenavToggled) {
      this.toggleSidenav();
    }
  }

  toggleSidenav() {
    this.sidenavToggled = !this.sidenavToggled;
    if (this.sidenavToggled) {
      document.body.classList.add('sidenav-toggled');
    } else {
      document.body.classList.remove('sidenav-toggled');
    }
  }

  get _windowDimensions() {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  get appIsInSync() {
    return this.pendingRequestCount === 0;
  }
}

export default decorate(UiState, {
  appIsInSync: computed,
  collapseMenu: action,
  language: observable,
  menuCollapsed: observable,
  pendingRequestCount: observable,
  sidenavToggled: observable,
  toggleSidenav: action,
  windowDimensions: observable.struct,
});
