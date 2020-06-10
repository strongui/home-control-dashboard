import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { IUserApiObj } from '../../store/AppState';
import * as React from 'react';

const { useRef, useState } = React;

interface IApiFormOwnProps {
  userApi?: IUserApiObj;
}

export type IApiFormProps = IApiFormOwnProps & Partial<IRootStore>;

interface IApiFormPropsState extends IUserApiObj {
  error?: string | null;
  pristine: boolean;
  submitting: boolean;
}

const samplePostObj = { id: 2, ident: 'heatingCompressor', objKey: 'iconCards', value: true };

const initState = ({ userApi = {} }: IApiFormProps) => {
  return {
    error: null,
    postApiUrl: userApi.postApiUrl ? userApi.postApiUrl : '',
    pristine: true,
    submitting: false,
    syncApiUrl: userApi.syncApiUrl ? userApi.syncApiUrl : '',
    weatherApiId: userApi.weatherApiId ? userApi.weatherApiId : '',
  };
};

function ApiForm(props: IApiFormProps) {
  const { store = storeDefaultProps.store } = props;
  const [state, setState] = useState<IApiFormPropsState>(initState(props));
  const weatherApiIdRef = useRef<HTMLInputElement>(null);
  const postApiUrldRef = useRef<HTMLInputElement>(null);

  const { appStore } = store;
  const { error, postApiUrl, syncApiUrl, weatherApiId, pristine, submitting } = state;
  const submitDisabled =
    submitting || (typeof error === 'string' && pristine) || (!error && pristine);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setState((s) => ({ ...s, [name]: value, pristine: false }));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;

    if (event.key === 'Enter') {
      if (name === 'syncApiUrl') {
        if (postApiUrldRef.current) {
          postApiUrldRef.current.focus();
        }
      } else if (name === 'postApiUrl') {
        if (weatherApiIdRef.current) {
          weatherApiIdRef.current.focus();
        }
      } else if (name === 'weatherApiId') {
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
    appStore.updateUserApi({ syncApiUrl, postApiUrl, weatherApiId }).then((response) => {
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
        <label htmlFor="syncApiUrl">API Endpoint (GET)</label>
        <input
          className="form-control"
          id="syncApiUrl"
          name="syncApiUrl"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter your API endpoint url to fetch data"
          type="text"
          value={syncApiUrl}
        />
        <small className="form-text text-muted">
          The API endpoint should return the same JSON object as is specified in the documentation
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="postApiUrl">API Endpoint (POST)</label>
        <input
          className="form-control"
          id="postApiUrl"
          name="postApiUrl"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter your API endpoint url to post data"
          type="text"
          value={postApiUrl}
        />
        <small className="form-text text-muted">
          The API endpoint will recieve a post body for every value change. I.E.{' '}
          <code>{JSON.stringify(samplePostObj)}</code>
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="weatherApiId">Open Weather API id</label>
        <input
          className="form-control"
          id="weatherApiId"
          name="weatherApiId"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter Open Weather API id"
          ref={weatherApiIdRef}
          type="text"
          value={weatherApiId}
        />
        <small id="emailHelp" className="form-text text-muted">
          In order for the weather section to work you must create a free API id at{' '}
          <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
            openweathermap.org
          </a>
        </small>
      </div>
      <button
        className={`btn btn-primary btn-block${submitDisabled ? ' disabled' : ''}`}
        disabled={submitDisabled}
        onClick={handleSubmit}
        type="button"
      >
        {submitting ? <span className="fas fa-spinner fa-pulse" aria-hidden="true" /> : 'Save'}
      </button>
    </form>
  );
}

export default inject('store')(observer(ApiForm));
