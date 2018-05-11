import * as React from 'react';
import { Link } from 'react-router-dom';

export default class SideMenu extends React.Component<{}, any> {
  render() {
    return (
      <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <span className="fas fa-tachometer-alt" aria-hidden="true" />
            <span className="nav-link-text">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/api" className="nav-link">
            <span className="fas fa-clipboard-list" aria-hidden="true" />
            <span className="nav-link-text">API</span>
          </Link>
        </li>
      </ul>
    );
  }
}
