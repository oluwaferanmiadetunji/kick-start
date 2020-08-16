import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Nav from './Nav';
import './style.css';

const Layout = (Component) => () => {
	return (
		<div className='layout'>
			<Grid className='header'>
				<Grid item md={6} lg={6} xs={12} sm={12} id='logo'>
					<Typography variant='h4'>Kick Start</Typography>
				</Grid>
				<Grid item md={6} lg={6} xs={12} sm={12} className='navigation__links'>
					<Nav />
				</Grid>
			</Grid>
			<Grid className='component'>
				<Component />
			</Grid>
		</div>
	);
};

export default Layout;
