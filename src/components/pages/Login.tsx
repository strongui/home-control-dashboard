import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import * as React from 'react';
// tslint:disable-next-line import-name
import Particles from 'react-particles-js';
import { particleOps } from './Error404';

export interface ILoginProps {
  store?: IAppState;
}

export interface ILoginState {
  username?: string;
  password?: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = { username: '', password: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>, id: string) {
    this.setState({ [id]: event.currentTarget.value });
  }

  handleSubmit() {
    console.log('submit this...', this.state.username, this.state.password);
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="container-fluid permission_denied">
        <Particles className="particles-js" params={particleOps} />
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  className="form-control"
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={e => this.handleChange(e, 'username')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => this.handleChange(e, 'password')}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={this.handleSubmit}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('store')(observer(Login));
