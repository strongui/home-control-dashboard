import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import * as React from 'react';
import carbonFibrePng from '../../images/carbonFibre.png';
import profilePng from '../../images/profile.png';

interface IUserNavItemOwnProps {}

export type IUserNavItemProps = IUserNavItemOwnProps & IRootStore;

@inject('store')
@observer
export default class UserNavItem extends React.Component<IUserNavItemProps, {}> {
  static defaultProps = storeDefaultProps;

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
