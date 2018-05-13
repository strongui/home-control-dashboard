import './index.css';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

// tslint:disable-next-line no-implicit-dependencies no-submodule-imports
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const storeInstance = new store();

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider routing={routingStore} store={storeInstance}><Router history={history}><App /></Router></Provider>,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
