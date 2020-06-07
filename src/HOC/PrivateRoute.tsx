import { Redirect, Route } from 'react-router-dom';
import * as React from 'react';
import Loading from '../components/Loading';

export interface IPrivateRouteProps {
  component: any;
  controlsInitialized: boolean;
  exact?: boolean;
  isLoggedIn: boolean;
  path: string;
}

export default function PrivateRoute(props: IPrivateRouteProps) {
  const { controlsInitialized, isLoggedIn, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props: any) =>
        isLoggedIn ? (
          controlsInitialized ? (
            <Component {...props} />
          ) : (
            <div className="container-fluid">
              <Loading />
            </div>
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
