import { Route, Switch } from 'react-router-dom';
import * as React from 'react';
import Api from './pages/Api';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';
import Footer from './footer/Footer';
import Header from './header/Header';
import Lights from './pages/Lights';
import Weather from './pages/Weather';

export default class Layout extends React.Component<{ pathname: string }, {}> {
  render() {
    return (
      <div className="App">
        <Header pathname={this.props.pathname} />
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
