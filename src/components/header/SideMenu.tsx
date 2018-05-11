import * as React from 'react';

export default class SideMenu extends React.Component<{}, any> {
  render() {
    return (
      <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
        <li className="nav-item">
          <a className="nav-link" href="index.html">
            <span className="fas fa-tachometer-alt" aria-hidden="true" />
            <span className="nav-link-text">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span className="fas fa-clipboard-list" aria-hidden="true" />
            <span className="nav-link-text">API</span>
          </a>
        </li>
      </ul>
    );
  }
}
