import { Link } from 'react-router-dom';
import * as React from 'react';

export interface INavLinkProps {
  children?: JSX.Element | JSX.Element[];
  location: Location;
  onMenuClick?: (event: React.MouseEvent<HTMLElement>) => any;
  to: string;
}

export default function NavLink({ children, location, onMenuClick, to }: INavLinkProps) {
  const isActive = location.pathname === to;
  const className = isActive ? ' active' : '';
  return (
    <li className={`nav-item${className}`} onClick={onMenuClick}>
      <Link className="nav-link" to={to}>
        {children}
      </Link>
    </li>
  );
}
