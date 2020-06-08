import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import { IRootStore, storeDefaultProps } from './store';
import * as React from 'react';
import Api from './components/pages/Api';
import Dashboard from './components/pages/Dashboard';
import Error404 from './components/pages/Error404';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Lights from './components/pages/Lights';
import Login from './components/pages/Login';
import PrivateRoute from './HOC/PrivateRoute';
import Weather from './components/pages/Weather';

const { useEffect } = React;

interface IAppOwnProps {}

type IAppProps = IAppOwnProps & Partial<IRootStore>;

function App({ store = storeDefaultProps.store }: IAppProps) {
  const { appStore } = store;
  const { controlsInitialized, isLoggedIn, syncStateWithServer } = appStore;

  useEffect(() => {
    if (!isLoggedIn) {
      document.body.classList.add('login', 'bg-dark');
    } else {
      document.body.classList.remove('login', 'bg-dark');
    }
    if (!controlsInitialized && isLoggedIn) {
      syncStateWithServer(1500);
    }
  }, [controlsInitialized, isLoggedIn, syncStateWithServer]);

  return (
    <div className={`App${!isLoggedIn ? ' login' : ''}`}>
      <Switch>{isLoggedIn && <Header />}</Switch>
      <div className="content-wrapper">
        <Switch>
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
          <Route component={Error404} />
          <Footer />
        </Switch>
      </div>
    </div>
  );
}

export default inject('store', 'routing')(observer(App));
