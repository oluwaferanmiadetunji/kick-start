import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { components as LoginPage } from './components/login';
import { components as LandingPage } from './components/landingPage';
import { components as RegistrationPage } from './components/registration';

export const Routes = () => (
	<Router>
		<Switch>
			<Route exact path='/login' component={LoginPage} />
			<Route exact path='/register' component={RegistrationPage} />
			<Route exact path='/' component={LandingPage} />
		</Switch>
	</Router>
);

export default Routes;
