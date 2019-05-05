import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import { reducer } from './model';

// tslint:disable no-var-requires
require('./style.css');
require('typeface-open-sans');

const store = createStore(reducer);

render((
    <Provider store={store}>
      <App/>
    </Provider>
  ),
    document.getElementById('app'),
);
