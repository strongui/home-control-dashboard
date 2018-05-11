import * as React from 'react';
import Notification, { INotification } from './Notification';
import { IDismissNotification } from '../Layout';
export interface ITopMenuProps {
  alerts?: INotification[];
  dismissNotification: IDismissNotification;
  messages?: INotification[];
}

export default class TopMenu extends React.Component<ITopMenuProps, {}> {
  render() {
    const { alerts = [], dismissNotification, messages = [] } = this.props;
    return (
      <ul className="navbar-nav ml-auto">
        <Notification
          dismissNotification={dismissNotification}
          icon="envelope"
          id="messages"
          notificationCount={messages.length}
          notifications={messages}
          title="Messages"
        />

        <Notification
          dismissNotification={dismissNotification}
          icon="bell"
          id="alerts"
          notificationCount={alerts.length}
          notifications={alerts}
          title="Alerts"
          type="warning"
        />

        <li className="nav-item">
          <a className="nav-link" data-toggle="modal" data-target="#exampleModal">
            <span className="fas fa-sign-out-alt mr-3" aria-hidden="true" />Logout
          </a>
        </li>
      </ul>
    );
  }
}
