import { Link } from 'react-router-dom';
import * as React from 'react';

export interface INavLinkProps {
  location: Location;
  onMenuClick?: (event: React.MouseEvent<HTMLElement>) => any;
  to: string;
}

export default class NavLink extends React.Component<INavLinkProps, any> {
  render() {
    const isActive = this.props.location.pathname === this.props.to;
    const className = isActive ? ' active' : '';

    return (
      <li className={`nav-item${className}`} onClick={this.props.onMenuClick}>
        <Link className="nav-link" to={this.props.to}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}
