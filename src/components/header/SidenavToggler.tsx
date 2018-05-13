import * as React from 'react';
import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';

export interface ISidenavTogglerProps {
  store?: IAppState;
}

const SidenavToggler: React.SFC<ISidenavTogglerProps> = ({ store }) => {
  return (
    <ul className="navbar-nav sidenav-toggler">
      <li className="nav-item">
        <a
          className="nav-link text-center"
          id="sidenavToggler"
          onClick={store!.uiStore.toggleSidenav }
        >
          <i className="fa fa-fw fa-angle-left" aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
};

export default inject('store')(observer(SidenavToggler));
