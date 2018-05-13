import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import Notification from './Notification';

export interface ITopMenuProps {
  store?: IAppState;
}

class TopMenu extends React.Component<ITopMenuProps, {}> {
  render() {
    const { store } = this.props;
    const { alerts = [], dismissNotification, messages = [] } = store!.appStore;
    return (
      <ul className="navbar-nav ml-auto">
        <Notification
          dismissNotification={dismissNotification}
          icon="envelope"
          id={1}
          ident="messages"
          notificationCount={messages.length}
          notifications={messages}
          title="Messages"
        />

        <Notification
          dismissNotification={dismissNotification}
          icon="bell"
          id={2}
          ident="alerts"
          notificationCount={alerts.length}
          notifications={alerts}
          title="Alerts"
          type="warning"
        />

        <li className="nav-item">
          <a className="nav-link" data-toggle="modal" data-target="#exampleModal">
            <span className="fas fa-sign-out-alt" aria-hidden="true" />Logout
          </a>
        </li>
      </ul>
    );
  }
}

export default inject('store')(observer(TopMenu));
