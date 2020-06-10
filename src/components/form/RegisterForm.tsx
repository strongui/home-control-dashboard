import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { IUserObj, IRegisterObj } from '../../store/AppState';
import * as React from 'react';

const { useRef, useState } = React;

interface IRegisterFormOwnProps {
  initialValues?: IUserObj;
  onSubmit?: (obj: IRegisterObj) => Promise<string | IUserObj>;
  optionalFields?: string[];
  readOnlyFields?: string[];
  submitButtonLabel?: string;
}

export type IRegisterFormProps = IRegisterFormOwnProps & Partial<IRootStore>;

interface IRegisterFormPropsState extends IUserObj {
  error?: string | null;
  passwordConfirm: string;
  pristine: boolean;
  submitting: boolean;
}

const initState = ({ initialValues = {} }: IRegisterFormProps) => {
  return {
    error: null,
    lastname: initialValues.lastname ? initialValues.lastname : '',
    name: initialValues.name ? initialValues.name : '',
    password: '',
    passwordConfirm: '',
    pristine: true,
    sex: initialValues.sex ? initialValues.sex : '',
    submitting: false,
    username: initialValues.username ? initialValues.username : '',
  };
};

function RegisterForm(props: IRegisterFormProps) {
  const {
    onSubmit,
    optionalFields = [],
    readOnlyFields = [],
    store = storeDefaultProps.store,
    submitButtonLabel = 'Submit',
  } = props;
  const [state, setState] = useState<IRegisterFormPropsState>(initState(props));
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const sexRef = useRef<HTMLInputElement>(null);

  const { appStore } = store;
  const {
    error,
    lastname,
    name,
    password,
    passwordConfirm,
    pristine,
    sex,
    submitting,
    username,
  } = state;
  const submitDisabled =
    (!optionalFields.includes('lastname') && lastname === '') ||
    (!optionalFields.includes('name') && name === '') ||
    (!optionalFields.includes('password') && password === '') ||
    (!optionalFields.includes('passwordConfirm') && passwordConfirm === '') ||
    (!optionalFields.includes('sex') && sex === '') ||
    (!optionalFields.includes('username') && username === '') ||
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
        if (nameRef.current) {
          nameRef.current.focus();
        }
      } else if (name === 'passwordConfirm') {
        if (passwordConfirmRef.current) {
          passwordConfirmRef.current.focus();
        }
      } else if (name === 'name') {
        if (lastnameRef.current) {
          lastnameRef.current.focus();
        }
      } else if (name === 'lastname') {
        if (sexRef.current) {
          sexRef.current.focus();
        }
      } else if (name === 'sex') {
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
    resolveSubmission({ lastname, name, password, passwordConfirm, sex, username }).then(
      (response) => {
        const error = typeof response === 'string' ? response : null;
        if (error) {
          setState((s) => ({
            ...s,
            error: error ? String(error) : 'Oops, something went wrong.',
            pristine: true,
            submitting: false,
          }));
        } else {
          setState((s) => ({
            ...s,
            error: null,
            pristine: true,
            submitting: false,
          }));
        }
      }
    );
  };

  const resolveSubmission = (obj: IRegisterObj): Promise<string | IUserObj> => {
    if (typeof onSubmit === 'function') {
      return onSubmit(obj);
    }
    return appStore.register({ lastname, name, password, passwordConfirm, sex, username });
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
        <input
          className="form-control"
          id="username"
          name="username"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter username"
          readOnly={readOnlyFields.includes('username')}
          type="text"
          value={username}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          id="password"
          name="password"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter password"
          readOnly={readOnlyFields.includes('password')}
          ref={passwordRef}
          type="password"
          value={password}
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirm">Confirm password</label>
        <input
          className="form-control"
          id="passwordConfirm"
          name="passwordConfirm"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Re-enter your password"
          readOnly={readOnlyFields.includes('passwordConfirm')}
          ref={passwordConfirmRef}
          type="password"
          value={passwordConfirm}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          id="name"
          name="name"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter name"
          readOnly={readOnlyFields.includes('name')}
          ref={nameRef}
          type="text"
          value={name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastname">Last name</label>
        <input
          className="form-control"
          id="lastname"
          name="lastname"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter last name"
          readOnly={readOnlyFields.includes('lastname')}
          ref={lastnameRef}
          type="text"
          value={lastname}
        />
      </div>
      <div className="form-group">
        <label htmlFor="sex">Sex</label>
        <div className="form-check">
          <label className="form-check-label">
            <input
              checked={sex === 'm'}
              className="form-check-input"
              name="sex"
              onChange={handleChange}
              readOnly={readOnlyFields.includes('sex')}
              ref={sexRef}
              type="radio"
              value="m"
            />
            Male
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              checked={sex === 'f'}
              className="form-check-input"
              name="sex"
              onChange={handleChange}
              readOnly={readOnlyFields.includes('sex')}
              type="radio"
              value="f"
            />
            Female
          </label>
        </div>
      </div>
      <button
        className={`btn btn-primary btn-block${submitDisabled ? ' disabled' : ''}`}
        disabled={submitDisabled}
        onClick={handleSubmit}
        type="button"
      >
        {submitting ? (
          <span className="fas fa-spinner fa-pulse" aria-hidden="true" />
        ) : (
          submitButtonLabel
        )}
      </button>
    </form>
  );
}

export default inject('store')(observer(RegisterForm));
