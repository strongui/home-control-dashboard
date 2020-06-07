import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import * as React from 'react';
import carbonFibrePng from '../../images/carbonFibre.png';
import profilePng from '../../images/profile.png';

interface IUserNavItemOwnProps {}

export type IUserNavItemProps = IUserNavItemOwnProps & Partial<IRootStore>;

function UserNavItem({ store = storeDefaultProps.store }: IUserNavItemProps) {
  const { appStore } = store;
  const { isLoggedIn, userFullName } = appStore;

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

export default inject('store')(observer(UserNavItem));
