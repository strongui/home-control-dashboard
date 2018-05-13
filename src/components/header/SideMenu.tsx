import * as React from 'react';
// import { NavLink } from 'react-router-dom';
import NavLink from './NavLink';

export default class SideMenu extends React.Component<{ pathname: string }, any> {
  render() {
    return (
      <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
        <NavLink pathname={this.props.pathname} to="/">
          <span className="fas fa-tachometer-alt" aria-hidden="true" />
          <span className="nav-link-text">Dashboard</span>
        </NavLink>

        <NavLink pathname={this.props.pathname} to="/lights">
          <span className="fas fa-lightbulb" aria-hidden="true" />
          <span className="nav-link-text">Lights</span>
        </NavLink>

        <NavLink pathname={this.props.pathname} to="/weather">
          <span className="fas fa-sun" aria-hidden="true" />
          <span className="nav-link-text">Weather</span>
        </NavLink>

        <NavLink pathname={this.props.pathname} to="/api">
          <span className="fas fa-clipboard-list" aria-hidden="true" />
          <span className="nav-link-text">API</span>
        </NavLink>

        <NavLink pathname={this.props.pathname} to="/someUnknown">
          <span className="fas fa-exclamation-circle" aria-hidden="true" />
          <span className="nav-link-text">Error 404</span>
        </NavLink>
      </ul>
    );
  }
}
