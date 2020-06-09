import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { particleOps } from './Error404';
import { Redirect, Link } from 'react-router-dom';
import * as React from 'react';
import LoginForm from '../form/LoginForm';
import Particles from 'react-particles-js';

const { useState } = React;

interface ILoginOwnProps {
  location?: { state: { from: { pathname: string; search?: string } } };
}

export type ILoginProps = ILoginOwnProps & Partial<IRootStore>;

function Login({
  location = { state: { from: { pathname: '/' } } },
  store = storeDefaultProps.store,
}: ILoginProps) {
  const [forgotPassword, setForgotPassword] = useState(false);
  const from = location?.state?.from || '/';
  const { appStore } = store;
  const { user } = appStore;
  const logginCls = typeof user === 'string' ? ' shake' : '';

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
          {forgotPassword && (
            <div className="alert alert-info" role="alert">
              <button
                aria-label="Close"
                className="close"
                data-dismiss="alert"
                onClick={() => setForgotPassword(false)}
                type="button"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              Think harder...
            </div>
          )}
          <LoginForm />
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-6">
              <Link to="/login" onClick={() => setForgotPassword(true)}>
                <span className="fas fa-question-circle" aria-hidden="true" /> Forgot password
              </Link>
            </div>
            <div className="col-6 text-right">
              <Link to="/register">
                Register <span className="fas fa-arrow-circle-right" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default inject('store')(observer(Login));
