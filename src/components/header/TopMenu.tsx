import * as React from 'react';
import Notification from './Notification';

const messages = require('./data/messages.json');
const alerts = require('./data/alerts.json');

export default class TopMenu extends React.Component<{}, any> {
  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <Notification
          title="Messages"
          notificationCount={messages.length}
          icon="envelope"
          notifications={messages}
        />

        <Notification
          title="Alerts"
          notificationCount={alerts.length}
          icon="bell"
          notifications={alerts}
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
