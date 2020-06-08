// Styles
import './scss/index.scss';

// Vendors
import 'mobx-react-lite/batchingForReactDom';

import { Provider } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';

// Components
import App from './App';
import store from './store';

// Routing
const routingStore = new RouterStore();

// Store
const storeInstance = new store();

ReactDOM.render(
  <Provider routing={routingStore} store={storeInstance}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
