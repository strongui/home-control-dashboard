import * as React from 'react';
import NavLink from './NavLink';

interface ISideMenuProps {
  location: Location;
  onMenuClick?: (event: React.MouseEvent<HTMLElement>) => any;
}

export default class SideMenu extends React.Component<ISideMenuProps, any> {
  render() {
    return (
      <ul className="navbar-nav navbar-sidenav">
        <NavLink location={this.props.location} to="/" onMenuClick={this.props.onMenuClick}>
          <span className="fas fa-tachometer-alt" aria-hidden="true" />
          <span className="nav-link-text">Dashboard</span>
        </NavLink>

        <NavLink location={this.props.location} to="/lights" onMenuClick={this.props.onMenuClick}>
          <span className="fas fa-lightbulb" aria-hidden="true" />
          <span className="nav-link-text">Lights</span>
        </NavLink>

        <NavLink location={this.props.location} to="/weather" onMenuClick={this.props.onMenuClick}>
          <span className="fas fa-sun" aria-hidden="true" />
          <span className="nav-link-text">Weather</span>
        </NavLink>

        <NavLink location={this.props.location} to="/api" onMenuClick={this.props.onMenuClick}>
          <span className="fas fa-clipboard-list" aria-hidden="true" />
          <span className="nav-link-text">API</span>
        </NavLink>

        <NavLink
          location={this.props.location}
          to="/someUnknown"
          onMenuClick={this.props.onMenuClick}
        >
          <span className="fas fa-exclamation-circle" aria-hidden="true" />
          <span className="nav-link-text">Error 404</span>
        </NavLink>
      </ul>
    );
  }
}
