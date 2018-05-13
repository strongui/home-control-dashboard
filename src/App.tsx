import { IAppState } from './store/';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import * as React from 'react';
import Layout from './components/Layout';

export interface IAppProps {
  store?: IAppState;
  routing?: any;
}

class App extends React.Component<IAppProps, {}> {
  render() {
    const { routing, store } = this.props;
    const pathname = routing.history.location.pathname;
    store!.appStore.syncStateWithServer(0);
    return (
      <div className="App">
        <Layout pathname={pathname} />
      </div>
    );
  }
}

// @ts-ignore
export default inject('store', 'routing')(withRouter(observer(App)));
