import { Link } from 'react-router-dom';
import * as React from 'react';

export interface INavLinkProps {
  to: string;
  pathname: string;
}

export default class NavLink extends React.Component<INavLinkProps, any> {
  render() {
    const isActive = this.props.pathname === this.props.to;
    const className = isActive ? ' active' : '';

    return (
      <li className={`nav-item${className}`}>
        <Link className="nav-link" {...this.props}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}
