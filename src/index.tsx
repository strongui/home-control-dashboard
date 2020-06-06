// Styles
import './scss/index.scss';

// Vendors
import 'mobx-react-lite/batchingForReactDom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Components
import App from './App';
import store from './store';

// Routing
const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

// Store
const storeInstance = new store();

ReactDOM.render(
  <Provider routing={routingStore} store={storeInstance}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
