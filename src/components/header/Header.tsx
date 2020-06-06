import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { Link } from 'react-router-dom';
import * as React from 'react';
import SideMenu from './SideMenu';
import SideNavToggler from './SideNavToggler';
import TopMenu from './TopMenu';

interface IHeaderOwnProps {
  location: Location;
}

export type IHeaderProps = IHeaderOwnProps & IRootStore;

@inject('store')
@observer
export default class Header extends React.Component<IHeaderProps, {}> {
  static defaultProps = storeDefaultProps;

  constructor(props: IHeaderProps) {
    super(props);

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(event: React.MouseEvent<HTMLElement>) {
    const { store } = this.props;
    const { uiStore } = store;
    const { menuCollapsed, collapseMenu, windowDimensions } = uiStore;
    const { width } = windowDimensions;
    if (width < 992 && !menuCollapsed) {
      collapseMenu();
    }
  }

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
          <SideMenu location={location} onMenuClick={this.handleMenuClick} />
          <SideNavToggler />
          <TopMenu />
        </div>
      </nav>
    );
  }
}
