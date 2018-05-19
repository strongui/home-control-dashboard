import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { particleOps } from './Error404';
import * as React from 'react';
import LoginForm from '../form/LoginForm';
// tslint:disable-next-line import-name
import Particles from 'react-particles-js';

export interface ILoginProps {
  store?: IAppState;
}
class Login extends React.Component<ILoginProps, {}> {
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

export default inject('store')(observer(Login));
