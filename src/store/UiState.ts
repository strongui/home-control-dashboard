import { action, computed, configure, observable } from 'mobx';
import RootStore from '.';

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' });

export default class UiState {
  rootStore: RootStore;

  @observable language = 'en_US';
  @observable menuCollapsed = true;
  @observable pendingRequestCount = 0;
  @observable sideNavOpen = true;

  // .struct makes sure observer won't be signaled unless the
  // dimensions object changed in a deepEqual manner
  @observable.struct windowDimensions = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    window.onresize = () => {
      this.setWindowDimensions();
      if (this.windowDimensions.width < 992 && !this.sideNavOpen) {
        this.toggleSideNav();
      }
    };
    this.collapseMenu = this.collapseMenu.bind(this);
    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  @action collapseMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }

  @action setWindowDimensions() {
    this.windowDimensions = this._windowDimensions;
  }

  @action toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
    if (!this.sideNavOpen) {
      document.body.classList.add('side-nav-closed');
    } else {
      document.body.classList.remove('side-nav-closed');
    }
  }

  get _windowDimensions() {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  @computed get appIsInSync() {
    return this.pendingRequestCount === 0;
  }
}
