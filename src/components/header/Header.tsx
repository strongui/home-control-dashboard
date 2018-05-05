import * as React from 'react';
import SideMenu from './SideMenu';
import SidenavToggler from './SidenavToggler';
import TopMenu from './TopMenu';

interface IHeaderState {
  collapsed: boolean;
}
class Header extends React.Component<{}, IHeaderState> {
  private navbar: HTMLElement;

  constructor(props: {}) {
    super(props);
    this.state = { collapsed: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    if (document.body.classList.contains('sidenav-toggled')) {
      document.body.classList.remove('sidenav-toggled');
    }

    const node = this.navbar;
    if (node.classList.contains('collapsing')) {
      return;
    }

    node.classList.remove('collapse');
    node.classList.remove('show');
    node.classList.add('collapsing');

    setTimeout(() => {
      if (this.state.collapsed) {
        node.setAttribute('style', 'height: 454px;');
      } else {
        node.removeAttribute('style');
      }
    }, 0);

    setTimeout(() => {
      node.classList.remove('collapsing');
      node.removeAttribute('style');
      this.setState({ collapsed: this.state.collapsed ? false : true });
    }, 350);
  }

  render() {
    const { collapsed } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <a className="navbar-brand" href="index.html">
          <span className="fas fa-tachometer-alt" aria-hidden="true" /> Start Bootstrap
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
          ref={div => { this.navbar = div as HTMLElement; }}
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
