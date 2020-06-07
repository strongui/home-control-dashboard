import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import * as React from 'react';

interface ISideNavTogglerOwnProps {}

export type ISideNavTogglerProps = ISideNavTogglerOwnProps & Partial<IRootStore>;

function SideNavToggler({ store = storeDefaultProps.store }: ISideNavTogglerProps) {
  const { uiStore } = store;
  const { sideNavOpen, toggleSideNav } = uiStore;

  return (
    <ul className="navbar-nav sidenav-toggler">
      <li className="nav-item">
        <div
          role="button"
          className="nav-link text-center"
          id="sideNavToggler"
          onClick={toggleSideNav}
        >
          <i className={`fa fa-fw fa-angle-${sideNavOpen ? 'left' : 'right'}`} aria-hidden="true" />
        </div>
      </li>
    </ul>
  );
}

export default inject('store')(observer(SideNavToggler));
