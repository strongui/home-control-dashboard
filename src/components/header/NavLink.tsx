import * as React from 'react';
import { Link } from 'react-router-dom';

export interface INavLinkProps {
  to: string;
}

export default class NavLinkDeux extends React.Component<INavLinkProps, any> {
  static contextTypes = {
    router: () => undefined,
  };

  render() {
    const isActive = this.context.router.route.location.pathname === this.props.to;
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
