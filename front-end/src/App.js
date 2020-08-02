import React from 'react';
// import redux stuffs
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
// import the routes
import Routes from './routes';
// import the sagas
import rootSaga from './rootSaga';
// import the reducers
import allReducers from './rootReducer';
// set up middleware to watch actions and reducers
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const initialState = {};

// create the globa store
const store = createStore(
	allReducers,
	initialState,
	// wrap all of them in a compose in order to wrap them as a single argument
	compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

// run the middleware for the rootsaga
sagaMiddleware.run(rootSaga);

const App = () => {
	return (
		<Provider store={store}>
			<Routes />
		</Provider>
	);
};
export default App;
