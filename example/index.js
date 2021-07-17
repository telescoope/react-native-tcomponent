import React, { useState, useEffect } from 'react';

import { AppRegistry, ActivityIndicator } from 'react-native';

import { Provider } from 'react-redux';

import { store, persistor } from './reducers';

import { PersistGate } from 'redux-persist/integration/react';

import App from './src/App';

import { name as appName } from './app.json';

function Main() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
