import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import * as React from 'react';
import SideMenu from './SideMenu';
import SidenavToggler from './SidenavToggler';
import TopMenu from './TopMenu';

interface IHeaderProps {
  location: Location;
  store?: IAppState;
}

class Header extends React.Component<IHeaderProps, {}> {
  render() {
    const { location, store } = this.props;
    const { menuCollapsed, collapseMenu } = store!.uiStore;
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
          <SideMenu location={location} />
          <SidenavToggler />
          <TopMenu />
        </div>
      </nav>
    );
  }
}

export default inject('store')(observer(Header));
