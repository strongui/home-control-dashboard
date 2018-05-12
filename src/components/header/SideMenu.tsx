import * as React from 'react';
// import { NavLink } from 'react-router-dom';
import NavLink from './NavLink';
export default class SideMenu extends React.Component<{}, any> {
  render() {
    return (
      <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
        <NavLink to="/">
          <span className="fas fa-tachometer-alt" aria-hidden="true" />
          <span className="nav-link-text">Dashboard</span>
        </NavLink>

        <NavLink to="/api">
          <span className="fas fa-clipboard-list" aria-hidden="true" />
          <span className="nav-link-text">API</span>
        </NavLink>

        <NavLink to="/someUnknown">
          <span className="fas fa-exclamation-circle" aria-hidden="true" />
          <span className="nav-link-text">Error 404</span>
        </NavLink>
      </ul>
    );
  }
}
