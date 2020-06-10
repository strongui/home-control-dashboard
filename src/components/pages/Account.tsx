import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { IUserObj } from '../../store/AppState';
import { Link } from 'react-router-dom';
import * as React from 'react';
import ApiForm from '../form/ApiForm';
import RegisterForm from '../form/RegisterForm';

interface IAccountOwnProps {}

export type IAccountProps = IAccountOwnProps & Partial<IRootStore>;

function Account({ store = storeDefaultProps.store }: IAccountProps) {
  const { appStore } = store;
  const { user, updateUser } = appStore;
  const { api = {}, lastname, name, sex, username } = user;

  const handleSubmit = async (obj: IUserObj): Promise<IUserObj | string> => {
    const response = await updateUser(obj);
    return response;
  };

  return (
    <div className="container-fluid">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/account">My Account</Link>
        </li>
        <li className="breadcrumb-item active">Update your details</li>
      </ol>
      <div className="row">
        <div className="col-sm-7">
          <div className="card">
            <div className="card-header">
              <span className="fas fa-user-circle" aria-hidden="true" /> Account
            </div>
            <div className="card-body">
              <RegisterForm
                initialValues={{ lastname, name, sex, username }}
                onSubmit={handleSubmit}
                optionalFields={['password', 'passwordConfirm']}
                readOnlyFields={['username']}
                submitButtonLabel="Save"
              />
            </div>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="card">
            <div className="card-header">
              <span className="fas fa-network-wired" aria-hidden="true" /> API Settings
            </div>
            <div className="card-body">
              <ApiForm userApi={api} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default inject('store')(observer(Account));
