import * as React from 'react';
import SideMenu from './SideMenu';
import SidenavToggler from './SidenavToggler';
import TopMenu from './TopMenu';

interface IHeaderState {
  collapsed: boolean;
}
class Header extends React.Component<{}, IHeaderState> {
  constructor(props: {}) {
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
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <a className="navbar-brand" href="index.html">
          <span className="fas fa-bolt" aria-hidden="true" /> Climate Control Dashboard
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
          <TopMenu />
        </div>
      </nav>
    );
  }
}

export default Header;
