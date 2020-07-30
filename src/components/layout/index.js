import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './style.css';

const Layout = (Component) => () => {
	return (
		<Grid className='layout'>
			<div>
				<Typography variant='h4'>Kick Start</Typography>
			</div>
			<Component />
		</Grid>
	);
};

export default Layout;
