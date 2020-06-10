import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { Redirect } from 'react-router-dom';
import * as React from 'react';
import NavLink from './NavLink';
import Notification from './Notification';

interface ITopMenuOwnProps {
  location: Location;
  onMenuClick?: (event: React.MouseEvent<HTMLElement>) => any;
}

export type ITopMenuProps = ITopMenuOwnProps & Partial<IRootStore>;

function TopMenu({ location, onMenuClick, store = storeDefaultProps.store }: ITopMenuProps) {
  const { appStore, uiStore } = store;
  const { alerts = [], dismissNotification, messages = [], userFullName } = appStore;
  const { windowDimensions } = uiStore;
  const { width } = windowDimensions;

  const logout = () => {
    appStore.logout().then(() => <Redirect to="/" />);
  };
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

      <NavLink location={location} to="/account" onMenuClick={onMenuClick}>
        <span className="fas fa-user-circle" aria-hidden="true" />
        <span className="nav-link-text">{userFullName}</span>
      </NavLink>
      <li className="nav-item">
        <button
          className="nav-link mr-lg-2 w-100 text-left border-0 bg-transparent outline-0"
          onClick={logout}
        >
          <span className="fas fa-sign-out-alt" aria-hidden="true" />
          Logout
        </button>
      </li>
    </ul>
  );
}

export default inject('store')(observer(TopMenu));
