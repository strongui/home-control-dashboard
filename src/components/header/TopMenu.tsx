import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { Redirect } from 'react-router-dom';
import * as React from 'react';
import Notification from './Notification';

interface ITopMenuOwnProps {}

export type ITopMenuProps = ITopMenuOwnProps & IRootStore;

@inject('store')
@observer
export default class TopMenu extends React.Component<ITopMenuProps, {}> {
  static defaultProps = storeDefaultProps;

  logout() {
    this.props.store.appStore.logout().then(() => <Redirect to="/" />);
  }

  render() {
    const { store } = this.props;
    const { appStore, uiStore } = store;
    const { alerts = [], dismissNotification, messages = [] } = appStore;
    const { windowDimensions } = uiStore;
    const { width } = windowDimensions;
    return (
      <ul className="navbar-nav ml-auto">
        <Notification
          closeOnOutsideClick={width > 991}
          dismissNotification={dismissNotification}
          icon="envelope"
          id={1}
          ident="messages"
          notificationCount={messages.length}
          notifications={messages}
          title="Messages"
        />

        <Notification
          closeOnOutsideClick={width > 991}
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
          <button className="nav-link button" onClick={this.logout.bind(this)}>
            <span className="fas fa-sign-out-alt" aria-hidden="true" />
            Logout
          </button>
        </li>
      </ul>
    );
  }
}
