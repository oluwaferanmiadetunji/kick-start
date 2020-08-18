import React, {Suspense, lazy} from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const LoginPage = lazy(() => import('./components/login'));
const LandingPage = lazy(() => import('./components/landingPage'));
const RegistrationPage = lazy(() => import('./components/registration'));
const CreateCampaingPage = lazy(() => import('./components/createCampaign'));
const SingleCampaign = lazy(() => import('./components/campaign'));
const Requests = lazy(() => import('./components/requests'));

export const Routes = () => (
	<Router>
		<Suspense
			fallback={
				<Backdrop
					open={true}
					style={{
						zIndex: 200,
						color: '#fff',
						backgroundColor: 'rgba(0, 0, 0, 0.9)',
					}}
				>
					<CircularProgress />
				</Backdrop>
			}
		>
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/login' component={LoginPage} />
				<Route exact path='/register' component={RegistrationPage} />
				<Route exact path='/campaigns/new' component={CreateCampaingPage} />
				<Route exact path='/campaigns/:address' component={SingleCampaign} />
				<Route exact path='/campaigns/:address/requests' component={Requests} />
			</Switch>
		</Suspense>
	</Router>
);

export default Routes;
