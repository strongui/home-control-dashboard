import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import * as React from 'react';

const { useRef, useState } = React;

interface ILoginFormOwnProps {}

export type ILoginFormProps = ILoginFormOwnProps & Partial<IRootStore>;

interface ILoginFormPropsState {
  error?: string | null;
  password: string;
  pristine: boolean;
  submitting: boolean;
  username: string;
}

const initState = () => {
  return { error: null, username: '', password: '', pristine: true, submitting: false };
};

function LoginForm({ store = storeDefaultProps.store }: ILoginFormProps) {
  const [state, setState] = useState<ILoginFormPropsState>(initState());
  const passwordRef = useRef<HTMLInputElement>(null);

  const { appStore } = store;
  const { username, password, error, pristine, submitting } = state;
  const submitDisabled =
    username === '' ||
    password === '' ||
    submitting ||
    (typeof error === 'string' && pristine) ||
    (!error && pristine);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setState((s) => ({ ...s, [name]: value, pristine: false }));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;

    if (event.key === 'Enter') {
      if (name === 'username') {
        if (passwordRef.current) {
          passwordRef.current.focus();
        }
      } else if (name === 'password') {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    setState((s) => ({
      ...s,
      error: null,
      pristine: true,
      submitting: true,
    }));
    appStore.login(username, password).then((response) => {
      const error = typeof response === 'string' ? response : null;
      if (error) {
        setState((s) => ({
          ...s,
          error: error ? String(error) : 'Oops, something went wrong.',
          pristine: true,
          submitting: false,
        }));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <div className="input-group">
          <span className="input-group-prepend">
            <div className="input-group-text">
              <span className="fas fa-user" aria-hidden="true" />
            </div>
          </span>
          <input
            className="form-control"
            id="username"
            name="username"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter username"
            type="text"
            value={username}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <div className="input-group">
          <span className="input-group-prepend">
            <div className="input-group-text">
              <span className="fas fa-unlock-alt" aria-hidden="true" />
            </div>
          </span>
          <input
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter password"
            ref={passwordRef}
            type="password"
            value={password}
          />
        </div>
      </div>
      <button
        className={`btn btn-primary btn-block${submitDisabled ? ' disabled' : ''}`}
        disabled={submitDisabled}
        onClick={handleSubmit}
        type="button"
      >
        {submitting ? <span className="fas fa-spinner fa-pulse" aria-hidden="true" /> : 'Login'}
      </button>
    </form>
  );
}

export default inject('store')(observer(LoginForm));
