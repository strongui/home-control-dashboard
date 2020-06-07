import * as React from 'react';
import NavLink from './NavLink';

interface ISideMenuProps {
  location: Location;
  onMenuClick?: (event: React.MouseEvent<HTMLElement>) => any;
}

export default function SideMenu({ location, onMenuClick }: ISideMenuProps) {
  return (
    <ul className="navbar-nav navbar-sidenav">
      <NavLink location={location} to="/" onMenuClick={onMenuClick}>
        <span className="fas fa-tachometer-alt" aria-hidden="true" />
        <span className="nav-link-text">Dashboard</span>
      </NavLink>

      <NavLink location={location} to="/lights" onMenuClick={onMenuClick}>
        <span className="fas fa-lightbulb" aria-hidden="true" />
        <span className="nav-link-text">Lights</span>
      </NavLink>

      <NavLink location={location} to="/weather" onMenuClick={onMenuClick}>
        <span className="fas fa-sun" aria-hidden="true" />
        <span className="nav-link-text">Weather</span>
      </NavLink>

      <NavLink location={location} to="/api" onMenuClick={onMenuClick}>
        <span className="fas fa-clipboard-list" aria-hidden="true" />
        <span className="nav-link-text">API</span>
      </NavLink>

      <NavLink location={location} to="/someUnknown" onMenuClick={onMenuClick}>
        <span className="fas fa-exclamation-circle" aria-hidden="true" />
        <span className="nav-link-text">Error 404</span>
      </NavLink>
    </ul>
  );
}
