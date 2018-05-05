import * as React from 'react';

const SidenavToggler: React.SFC = () => {
  function toggle() {
    if (document.body.classList.contains('sidenav-toggled')) {
      document.body.classList.remove('sidenav-toggled');
    } else {
      document.body.classList.add('sidenav-toggled');
    }
  }

  return (
    <ul className="navbar-nav sidenav-toggler">
      <li className="nav-item">
        <a className="nav-link text-center" id="sidenavToggler" onClick={toggle}>
          <i className="fa fa-fw fa-angle-left" aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
};

export default SidenavToggler;
