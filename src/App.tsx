import { inject, observer } from 'mobx-react';
import * as React from 'react';
import Layout from './components/Layout';
import { IAppState } from './store/';

export interface IAppProps {
  store?: IAppState;
}

class App extends React.Component<IAppProps, {}> {
  render() {
    const { store } = this.props;
    store!.appStore.syncStateWithServer(0);
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

export default inject('store')(observer(App));
