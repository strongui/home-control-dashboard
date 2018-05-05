import * as React from 'react';
import SideMenu from './SideMenu';
import SidenavToggler from './SidenavToggler';
import TopMenu from './TopMenu';

interface IHeaderState {
  collapsing: boolean;
  collapsed: boolean;
}
class Header extends React.Component<{}, IHeaderState> {
  constructor(props: {}) {
    super(props);
    this.state = { collapsing: false, collapsed: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ ...this.state, collapsing: this.state.collapsed ? true : false }, () => {
      setTimeout(() => {
        this.setState((state: IHeaderState, props) => {
          return { collapsing: false, collapsed: state.collapsed ? false : true };
        });
      }, 1500);
    });
  }

  render() {
    const { collapsing, collapsed } = this.state;
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
          className={`navbar-collapse${collapsing ? ' collapsing' : ''}${
            !collapsing && !collapsed ? ' show' : ''
          }${!collapsing && collapsed ? ' collapse' : ''}`}
          id="navbarResponsive"
          style={collapsing ? { height: '450px' } : {}}
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
