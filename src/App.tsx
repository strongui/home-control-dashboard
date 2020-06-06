import { inject, observer } from 'mobx-react';
import { IRootStore, IRouting, storeDefaultProps, routingDefaultProps } from './store';
import { Route, Switch } from 'react-router-dom';
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

interface IAppOwnProps {}

type IAppProps = IAppOwnProps & IRootStore & IRouting;

@inject('store', 'routing')
@observer
export default class App extends React.Component<IAppProps> {
  static defaultProps = { ...routingDefaultProps, ...storeDefaultProps };

  componentDidMount() {
    if (this.props.store) {
      // this.props.store.appStore.syncStateWithServer(0)
      if (!this.props.store.appStore.isLoggedIn) {
        document.body.classList.add('login', 'bg-dark');
      }
      if (!this.props.store.appStore.controlsInitialized && this.props.store.appStore.isLoggedIn) {
        this.props.store.appStore.syncStateWithServer(0);
      }
    }
  }

  componentDidUpdate(prevProps: IAppProps) {
    if (prevProps.store) {
      if (!prevProps.store.appStore.isLoggedIn) {
        document.body.classList.add('login', 'bg-dark');
      } else {
        document.body.classList.remove('login', 'bg-dark');
        if (!prevProps.store.appStore.controlsInitialized) {
          prevProps.store.appStore.syncStateWithServer(0);
        }
      }
    }
  }

  render() {
    const { routing, store } = this.props;
    const { location } = routing;
    const isLoggedIn = store ? store.appStore.isLoggedIn : false;

    return (
      <div className={`App${!isLoggedIn ? ' login' : ''}`}>
        {isLoggedIn && <Header location={location} />}
        <div className="content-wrapper">
          <Switch>
            <PrivateRoute isLoggedIn={isLoggedIn} exact path="/" component={Dashboard} />
            <PrivateRoute isLoggedIn={isLoggedIn} path="/api" component={Api} />
            <PrivateRoute isLoggedIn={isLoggedIn} path="/lights" component={Lights} />
            <PrivateRoute isLoggedIn={isLoggedIn} path="/weather" component={Weather} />
            <Route path="/login" component={Login} />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

// export default inject('store', 'routing')(observer(App));
