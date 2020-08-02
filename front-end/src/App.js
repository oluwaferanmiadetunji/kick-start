import React from 'react';
// import redux stuffs
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
// import the routes
import Routes from './routes';
// import the sagas
import rootSaga from './rootSaga';
// import the reducers
import allReducers from './rootReducer';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['registerLoading'],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

// set up middleware to watch actions and reducers
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// create the globa store
const store = createStore(
	persistedReducer,
	// wrap all of them in a compose in order to wrap them as a single argument
	compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

const persistor = persistStore(store);
// run the middleware for the rootsaga
sagaMiddleware.run(rootSaga);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Routes />
			</PersistGate>
		</Provider>
	);
};
export default App;
