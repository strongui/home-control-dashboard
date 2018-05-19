import { IDismissNotification } from '../../store/AppState';
import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import reactOnclickoutside from 'react-onclickoutside';
// tslint:disable-next-line import-name
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export interface INotificationProps {
  dismissNotification: IDismissNotification;
  icon?: string;
  id: number;
  ident: string;
  link?: string;
  notificationCount: number;
  notifications?: INotification[];
  title: string;
  type?: string;
}

export interface INotification {
  id: number;
  ident: string;
  title: string;
  date: string;
  content: string;
}

export interface INotificationState {
  expanded: boolean;
}

class Notification extends React.Component<INotificationProps, INotificationState> {
  constructor(props: INotificationProps) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e?: React.MouseEvent<HTMLElement>) {
    if (e) e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  handleClickOutside(e: React.MouseEvent<HTMLElement>) {
    if (this.state.expanded) this.toggle();
  }

  render() {
    const { expanded } = this.state;
    const {
      dismissNotification,
      icon = 'exclamation-triangle',
      notificationCount = 0,
      notifications = [],
      ident,
      title,
      type = 'primary',
    } = this.props;
    const tooltipId = `tooltip-${ident}-${this.props.id}`;

    if (!notificationCount) {
      return (
        <li
          className={`nav-item dropdown${expanded ? ' show' : ''}`}
          data-tip={`No new ${title}`}
          data-for={tooltipId}
        >
          <span className="nav-link no-items">
            <span className={`fas fa-${icon}`} aria-hidden="true" />
            <span className="d-lg-none">{title}</span>
          </span>
          <ReactTooltip id={tooltipId} />
        </li>
      );
    }

    const id = `${title.toLowerCase}Dropdown`;

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
          <span className="d-lg-none">
            {title}
            {notificationCount > 0 && (
              <span className={`ml-2 badge badge-pill badge-${type}`}>{notificationCount} New</span>
            )}
          </span>
          <span className={`indicator text-${type} d-none d-lg-block`}>
            <span className="fa fa-fw fa-circle" aria-hidden="true" />
          </span>
        </a>
        <div
          className={`dropdown-menu dropdown-menu-right${expanded ? ' show' : ''}`}
          aria-labelledby={id}
        >
          <h6 className="dropdown-header">New {title}:</h6>
          <div className="dropdown-divider" />
          <TransitionGroup>
            {notifications.map(notificationObj => (
              <CSSTransition timeout={300} classNames="fade" key={notificationObj.id}>
                <div>
                  <div className="dropdown-item">
                    <button
                      type="button"
                      className="close"
                      aria-label="Dismiss"
                      onClick={() => dismissNotification(this.props.ident, notificationObj.id)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <strong>{notificationObj.title}</strong>
                    <span className="small float-right text-muted">{notificationObj.date}</span>
                    <div className="dropdown-message small">{notificationObj.content}</div>
                  </div>
                  <div className="dropdown-divider" />
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
          <a className="dropdown-item small" href="javascript:;">
            View all {title.toLowerCase()}
          </a>
        </div>
      </li>
    );
  }
}

export default (reactOnclickoutside as any)(Notification);
