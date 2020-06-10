import { inject, observer } from 'mobx-react';
import { ILocation, IRootStore, storeDefaultProps, locationDefaultProps } from '../../store';
import { Link } from 'react-router-dom';
import * as React from 'react';
import SideMenu from './SideMenu';
import SideNavToggler from './SideNavToggler';
import TopMenu from './TopMenu';

interface IHeaderOwnProps {}

export type IHeaderProps = IHeaderOwnProps & Partial<IRootStore> & Partial<ILocation>;

function Header({
  location = locationDefaultProps.location,
  store = storeDefaultProps.store,
}: IHeaderProps) {
  const { uiStore } = store;
  const { menuCollapsed, collapseMenu } = uiStore;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    const { uiStore } = store;
    const { menuCollapsed, collapseMenu, windowDimensions } = uiStore;
    const { width } = windowDimensions;
    if (width < 992 && !menuCollapsed) {
      collapseMenu();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
      <Link className="navbar-brand" to="/">
        <span className="fas fa-bolt" aria-hidden="true" />
        <div className="scan-wrapper">
          <div className="focus">Home Control Dashboard</div>
          <div className="mask">
            <div className="text">Home Control Dashboard</div>
          </div>
        </div>
      </Link>
      <button
        onClick={collapseMenu}
        className={`navbar-toggler navbar-toggler-right${menuCollapsed ? ' collapsed' : ''}`}
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded={!menuCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className={`navbar-collapse${menuCollapsed ? ' collapse' : ' show'}`}
        id="navbarResponsive"
      >
        <SideMenu location={location} onMenuClick={handleMenuClick} />
        <SideNavToggler />
        <TopMenu location={location} onMenuClick={handleMenuClick} />
      </div>
    </nav>
  );
}

export default inject('store')(observer(Header));
