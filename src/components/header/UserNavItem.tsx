import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import carbonFibrePng from '../../images/carbonFibre.png';
import profilePng from '../../images/profile.png';

export interface IUserNavItemProps {
  store?: IAppState;
}

class UserNavItem extends React.Component<IUserNavItemProps, {}> {
  render() {
    const { store } = this.props;
    const isLoggedIn = store ? store.appStore.isLoggedIn : false;
    const userFullName = store ? store.appStore.userFullName : '';
    if (!isLoggedIn) return <li className="nav-item" />;

    return (
      <li
        className="nav-item user"
        style={{
          backgroundImage: `url(${carbonFibrePng})`,
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="nav-link">
          <div className="profile-img">
            {' '}
            <img src={profilePng} alt="user" />{' '}
          </div>
          <span className="name">{userFullName}</span>
        </div>
      </li>
    );
  }
}

export default inject('store')(observer(UserNavItem));
