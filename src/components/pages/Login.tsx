import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { particleOps } from './Error404';
import { Redirect } from 'react-router-dom';
import * as React from 'react';
import LoginForm from '../form/LoginForm';
import Particles from 'react-particles-js';

interface ILoginOwnProps {}

export type ILoginProps = ILoginOwnProps & IRootStore;

@inject('store')
@observer
export default class Login extends React.Component<ILoginProps, {}> {
  static defaultProps = storeDefaultProps;

  render() {
    const { from } = (this.props as any).location.state || { from: { pathname: '/' } };
    const logginCls = this.props.store && this.props.store.appStore.user.error ? ' shake' : '';

    if (this.props.store && this.props.store.appStore.isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="container-fluid permission_denied">
        <Particles className="particles-js" params={particleOps} />
        <div className={`card card-login mx-auto mt-5${logginCls}`}>
          <div className="card-header">
            <span className="fas fa-bolt" aria-hidden="true" /> Home Control Dashboard Login
          </div>
          <div className="card-body">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}
