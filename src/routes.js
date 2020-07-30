import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { components as LoginPage } from './components/login';

export const Routes = () => (
	<Router>
		<Switch>
			<Route exact path='/login' component={LoginPage} />
		</Switch>
	</Router>
);

export default Routes;
