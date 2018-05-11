import { INotification } from './Notification';
import * as React from 'react';
import SideMenu from './SideMenu';
import SidenavToggler from './SidenavToggler';
import TopMenu from './TopMenu';
import { IDismissNotification } from '../Layout';
interface IHeaderState {
  collapsed: boolean;
}
interface IHeaderProps {
  alerts?: INotification[];
  messages?: INotification[];
  dismissNotification: IDismissNotification;
}
class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = { collapsed: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    if (document.body.classList.contains('sidenav-toggled')) {
      document.body.classList.remove('sidenav-toggled');
    }
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { collapsed } = this.state;
    const { alerts, dismissNotification, messages } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <a className="navbar-brand" href="index.html">
          <span className="fas fa-bolt" aria-hidden="true" />
          <div className="scan-wrapper">
            <div className="focus">Climate Control Dashboard</div>
            <div className="mask">
              <div className="text">Climate Control Dashboard</div>
            </div>
          </div>
        </a>
        <button
          onClick={this.toggle}
          className={`navbar-toggler navbar-toggler-right${collapsed ? ' collapsed' : ''}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded={!collapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={`navbar-collapse${collapsed ? ' collapse' : ' show'}`}
          id="navbarResponsive"
        >
          <SideMenu />
          <SidenavToggler />
          <TopMenu alerts={alerts} dismissNotification={dismissNotification} messages={messages} />
        </div>
      </nav>
    );
  }
}

export default Header;
