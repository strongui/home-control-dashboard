import { Redirect, Route } from 'react-router-dom';
import * as React from 'react';

export interface IPrivateRouteProps {
  component: any;
  exact?: boolean;
  isLoggedIn: boolean;
  path: string;
}

export default class PrivateRoute extends React.Component<IPrivateRouteProps, {}> {
  render() {
    const { isLoggedIn, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props: any) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    );
  }
}
