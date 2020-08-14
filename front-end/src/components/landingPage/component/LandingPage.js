import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import action from '../actions';

const LandingPage = () => {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.loginLoading);
	const campaigns = useSelector((state) => state.campaigns);

	useEffect(() => {
		dispatch(action.getCampaigns());
	}, []);

	return loading ? (
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
	) : (
		<Grid container id='container' spacing={4}>
			{campaigns.map((campaign, index) => (
				<Grid item xs={12} sm={12} md={4} lg={4} className='component' key={index}>
					<Card id='component__card'>
						<CardContent>
							<div style={{textAlign: 'left'}}>
								<Typography variant='body1' style={{marginBottom: 10}}>
									Address: {campaign}
								</Typography>
							</div>
							<Button style={{background: 'red', color: 'white', marginTop: 10, textAlign: 'center'}} size='small'>
								<Link to='/'>
									<KeyboardArrowRightIcon />
								</Link>
							</Button>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default LandingPage;
