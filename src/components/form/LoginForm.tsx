import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import * as React from 'react';

interface ILoginFormOwnProps {}

export type ILoginFormProps = ILoginFormOwnProps & IRootStore;

interface ILoginFormPropsState {
  error?: string | null;
  password?: string;
  pristine: boolean;
  submitting: boolean;
  username?: string;
}

@inject('store')
@observer
export default class LoginForm extends React.Component<ILoginFormProps, ILoginFormPropsState> {
  static defaultProps = storeDefaultProps;

  constructor(props: ILoginFormProps) {
    super(props);
    this.state = { username: '', password: '', pristine: true, submitting: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>, id: string) {
    this.setState({ ...this.state, [id]: event.currentTarget.value, pristine: false });
  }

  handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>, id: string) {
    if (event.key === 'Enter') {
      const { password, submit } = this.refs;
      if (id === 'username') {
        (password as HTMLInputElement).focus();
      } else if (id === 'password') {
        (submit as HTMLInputElement).click();
      }
    }
  }

  handleSubmit() {
    this.setState({
      ...this.state,
      error: null,
      pristine: true,
      submitting: true,
    });
    this.props
      .store!.appStore.login(this.state.username as string, this.state.password as string)
      .then((response) => {
        const { error } = response;
        if (error) {
          this.setState({
            ...this.state,
            error: error ? error : 'Oops, something went wrong.',
            pristine: true,
            submitting: false,
          });
        }
      });
  }

  render() {
    const { username, password, error, pristine, submitting } = this.state;
    const submitDisabled =
      username === '' ||
      password === '' ||
      submitting ||
      (typeof error === 'string' && pristine) ||
      (!error && pristine);
    return (
      <form onSubmit={this.handleSubmit}>
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
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => this.handleChange(e, 'username')}
              onKeyPress={(e) => this.handleKeyPress(e, 'username')}
              ref="username"
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => this.handleChange(e, 'password')}
              onKeyPress={(e) => this.handleKeyPress(e, 'password')}
              ref="password"
            />
          </div>
        </div>
        <button
          className={`btn btn-primary btn-block${submitDisabled ? ' disabled' : ''}`}
          disabled={submitDisabled}
          onClick={this.handleSubmit}
          ref="submit"
          type="button"
        >
          {submitting ? <span className="fas fa-spinner fa-pulse" aria-hidden="true" /> : 'Login'}
        </button>
      </form>
    );
  }
}
