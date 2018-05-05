import * as React from 'react';

export interface INotificationProps {
  icon?: string;
  link?: string;
  notificationCount: number;
  notifications?: INotification[];
  title: string;
  type?: string;
}

export interface INotification {
  key: number;
  title: string;
  date: string;
  content: string;
}

export interface INotificationState {
  expanded: boolean;
}

export default class Notification extends React.Component<INotificationProps, INotificationState> {
  constructor(props: INotificationProps) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { expanded } = this.state;
    const {
      icon = 'exclamation-triangle',
      link = '#',
      notificationCount = 0,
      notifications = [],
      title,
      type = 'primary',
    } = this.props;

    const id = `${title.toLowerCase}Dropdown`;
    const notificationItems = notifications.map(notificationObj => (
      <span key={notificationObj.key}>
        <a className="dropdown-item" href="#">
          <strong>{notificationObj.title}</strong>
          <span className="small float-right text-muted">{notificationObj.date}</span>
          <div className="dropdown-message small">{notificationObj.content}</div>
        </a>
        <div className="dropdown-divider" />
      </span>
    ));
    return (
      <li className={`nav-item dropdown${expanded ? ' show' : ''}`}>
        <a
          className="nav-link dropdown-toggle mr-lg-2"
          id={id}
          href="#"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={expanded}
          onClick={this.toggle}
        >
          <span className={`fas fa-${icon}`} aria-hidden="true" />
          <span className="d-lg-none pl-3">
            {title}
            {notificationCount > 0 && (
              <span className={`ml-2 badge badge-pill badge-${type}`}>{notificationCount} New</span>
            )}
          </span>
          <span className="indicator text-primary d-none d-lg-block">
            <span className="fa fa-fw fa-circle" aria-hidden="true" />
          </span>
        </a>
        <div className={`dropdown-menu${expanded ? ' show' : ''}`} aria-labelledby={id}>
          <h6 className="dropdown-header">New {title}:</h6>
          <div className="dropdown-divider" />
          {notificationItems}
          <a className="dropdown-item small" href={link}>
            View all {title.toLowerCase()}
          </a>
        </div>
      </li>
    );
  }
}
