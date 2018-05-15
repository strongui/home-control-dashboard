import { IAppState } from './store/';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as React from 'react';
import Api from './components/pages/Api';
import Dashboard from './components/pages/Dashboard';
// tslint:disable-next-line import-name
// import DevTools from 'mobx-react-devtools';
import Error404 from './components/pages/Error404';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Lights from './components/pages/Lights';
import Login from './components/pages/Login';
import Weather from './components/pages/Weather';

import PrivateRoute from './HOC/PrivateRoute';
export interface IAppProps {
  store?: IAppState;
  routing?: any;
}

class App extends React.Component<IAppProps, {}> {
  componentDidMount() {
    if (this.props.store) {
      // this.props.store.appStore.syncStateWithServer(0)
      if (!this.props.store.appStore.isLoggedIn) {
        document.body.classList.add('login', 'bg-dark');
      }
    }
  }

  render() {
    const { routing, store } = this.props;
    const location: Location = routing ? routing.history.location : {};
    const isLoggedIn = store ? store.appStore.isLoggedIn : false;

    return (
      <div className={`App${!isLoggedIn ? ' login' : ''}`}>
        {isLoggedIn && <Header location={location} />}
        <div className="content-wrapper">
          <Switch>
            <Route isLoggedIn={isLoggedIn} exact path="/" component={Dashboard} />
            <PrivateRoute isLoggedIn={isLoggedIn} path="/api" component={Api} />
            <PrivateRoute isLoggedIn={isLoggedIn} path="/lights" component={Lights} />
            <Route isLoggedIn={isLoggedIn} path="/weather" component={Weather} />
            <Route path="/login" component={Login} />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default inject('store', 'routing')(withRouter(observer(App)));
