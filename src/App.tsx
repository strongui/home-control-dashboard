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
import Weather from './components/pages/Weather';
export interface IAppProps {
  store?: IAppState;
  routing?: any;
}

class App extends React.Component<IAppProps, {}> {
  componentDidMount() {
    if (this.props.store) this.props.store.appStore.syncStateWithServer(0);
  }

  render() {
    const { routing } = this.props;
    const location: Location = routing ? routing.history.location : {};
    return (
      <div className="App">
        <Header location={location} />
        <div className="content-wrapper">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/api" component={Api} />
            <Route path="/lights" component={Lights} />
            <Route path="/weather" component={Weather} />
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
