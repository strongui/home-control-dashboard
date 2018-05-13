import './index.css';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const s = new store();

ReactDOM.render(
  <Provider store={s}><App /></Provider>,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
