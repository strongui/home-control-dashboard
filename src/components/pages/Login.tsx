import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { particleOps } from './Error404';
import { Redirect } from 'react-router-dom';
import * as React from 'react';
import LoginForm from '../form/LoginForm';
import Particles from 'react-particles-js';

interface ILoginOwnProps {
  location?: { state: { from: { pathname: string; search?: string } } };
}

export type ILoginProps = ILoginOwnProps & Partial<IRootStore>;

function Login({
  location = { state: { from: { pathname: '/' } } },
  store = storeDefaultProps.store,
}: ILoginProps) {
  const { from } = location.state;
  const { appStore } = store;
  const logginCls = appStore.user.error ? ' shake' : '';

  if (appStore.isLoggedIn) {
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

export default inject('store')(observer(Login));
