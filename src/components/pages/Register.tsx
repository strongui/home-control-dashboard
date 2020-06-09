import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { particleOps } from './Error404';
import { Redirect, Link } from 'react-router-dom';
import * as React from 'react';
import Particles from 'react-particles-js';
import RegisterForm from '../form/RegisterForm';

interface IRegisterOwnProps {}

export type IRegisterProps = IRegisterOwnProps & Partial<IRootStore>;

function Register({ store = storeDefaultProps.store }: IRegisterProps) {
  const from = '/';
  const { appStore } = store;
  const { user } = appStore;
  const logginCls = typeof user === 'string' ? ' shake' : '';

  if (appStore.isLoggedIn) {
    return <Redirect to={from} />;
  }

  return (
    <div className="container-fluid permission_denied">
      <Particles className="particles-js" params={particleOps} />
      <div className={`card card-register mx-auto mt-5${logginCls}`}>
        <div className="card-header">
          <span className="fas fa-bolt" aria-hidden="true" /> Home Control Dashboard Register
        </div>
        <div className="card-body">
          <RegisterForm />
        </div>
        <div className="card-footer text-right">
          <Link to="/login">
            <span className="fas fa-arrow-circle-left" aria-hidden="true" /> Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default inject('store')(observer(Register));
