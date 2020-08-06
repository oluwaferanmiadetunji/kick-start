import React from 'react';
import jwtDecode from 'jwt-decode';
// import redux stuffs
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
// import the routes
import Routes from './routes';
// import the sagas
import rootSaga from './rootSaga';
// import the reducers
import allReducers from './rootReducer';

import {actions} from './components/login';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [''],
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

const token = localStorage.Token;
if (token) {
	const decoded = jwtDecode(token);
	if (decoded.exp * 1000 < Date.now()) {
		store.dispatch(actions.isLogged(false));
		window.location.href = '/login';
	} else {
		store.dispatch(actions.isLogged(true));
	}
} else {
	store.dispatch(actions.isLogged(false));
	window.location.href = '/login';
}

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
