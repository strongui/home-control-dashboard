import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from './store';
import { Route, Switch } from 'react-router-dom';
import * as React from 'react';
import Account from './components/pages/Account';
import Api from './components/pages/Api';
import Dashboard from './components/pages/Dashboard';
import Error404 from './components/pages/Error404';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Lights from './components/pages/Lights';
import Login from './components/pages/Login';
import PrivateRoute from './HOC/PrivateRoute';
import Register from './components/pages/Register';
import Weather from './components/pages/Weather';

const { useEffect, useState } = React;

interface IAppOwnProps {}

type IAppProps = IAppOwnProps & Partial<IRootStore>;

function App({ store = storeDefaultProps.store }: IAppProps) {
  const { appStore } = store;
  const { controlsInitialized, isLoggedIn, syncStateWithServer, user } = appStore;
  const syncApiUrl = user?.api?.syncApiUrl;
  const delay = syncApiUrl ? 0 : 1500;
  const [syncApiUrlInState, setSyncApiUrlInState] = useState(syncApiUrl);

  useEffect(() => {
    if (!isLoggedIn) {
      document.body.classList.add('login', 'bg-dark');
    } else {
      document.body.classList.remove('login', 'bg-dark');
    }
    if (isLoggedIn && (!controlsInitialized || syncApiUrlInState !== syncApiUrl)) {
      syncStateWithServer(delay, syncApiUrl);
      if (syncApiUrlInState !== syncApiUrl) {
        setSyncApiUrlInState(syncApiUrl);
      }
    }
  }, [controlsInitialized, isLoggedIn, syncApiUrl, syncStateWithServer, delay, syncApiUrlInState]);

  return (
    <div className={`App${!isLoggedIn ? ' login' : ''}`}>
      <Switch>{isLoggedIn && <Header />}</Switch>
      <div className="content-wrapper">
        <Switch>
          <PrivateRoute
            component={Account}
            controlsInitialized={controlsInitialized}
            exact
            isLoggedIn={isLoggedIn}
            path="/account"
          />
          <PrivateRoute
            component={Dashboard}
            controlsInitialized={controlsInitialized}
            exact
            isLoggedIn={isLoggedIn}
            path="/"
          />
          <PrivateRoute
            component={Api}
            controlsInitialized={controlsInitialized}
            isLoggedIn={isLoggedIn}
            path="/api"
          />
          <PrivateRoute
            component={Lights}
            controlsInitialized={controlsInitialized}
            isLoggedIn={isLoggedIn}
            path="/lights"
          />
          <PrivateRoute
            component={Weather}
            controlsInitialized={controlsInitialized}
            isLoggedIn={isLoggedIn}
            path="/weather"
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Error404} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default inject('store', 'routing')(observer(App));
