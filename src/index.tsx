import { setAutoFreeze } from 'immer';
import localForage from 'localforage';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
// tslint:disable no-submodule-imports
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import { reducer } from './model';

// tslint:disable no-var-requires
require('./style.css');
require('typeface-open-sans');

const persistConfig = {
  key: 'root',
  storage: localForage,
  stateReconciler: hardSet,
};

// needed to make redux-persist work with Immer
setAutoFreeze(false);

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

render((
    <Provider store={store}>
      <PersistGate persistor={ persistor }>
        <App/>
      </PersistGate>
    </Provider>
  ),
    document.getElementById('app'),
);
