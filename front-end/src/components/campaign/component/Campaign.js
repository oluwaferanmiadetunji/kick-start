import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Campaign from '../../../web3/campaign';
import TextField from '@material-ui/core/TextField';

const SingleCampaign = (props) => {
	const address = window.location.href.split('/campaigns/')[1];
	const campaign = Campaign(address);

	const [loading, setLoading] = useState(true);
	const [manager, setManager] = useState('');
	const [description, setDescription] = useState('');
	const [minimumContribution, setMinimumContribution] = useState(0);
	const [balance, setBalance] = useState(0);
	const [requestCount, setRequestCount] = useState(0);
	const [donors, setDonors] = useState(0);
	const [total, setTotal] = useState(0);
	const [managerAddress, setManagerAddress] = useState('');

	async function getDetails() {
		const summary = await campaign.methods.getSummary().call();
		setManager(summary[6]);
		setDescription(summary[5]);
		setMinimumContribution(summary[0]);
		setBalance(summary[1]);
		setRequestCount(summary[2]);
		setDonors(summary[3]);
		setTotal(summary[4]);
		setManagerAddress(summary[7]);
		setLoading(false);
	}

	useEffect(() => {
		getDetails();
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
			<Grid item xs={12} sm={12} md={6} lg={6} className='component'>
				<Card id='component__card'>
					<CardContent>
						<div style={{textAlign: 'left'}}>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Description: {description}
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={12} md={6} lg={6} className='component'>
				<Card id='component__card'>
					<CardContent>
						<div style={{textAlign: 'left'}}>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Address: {address}
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={12} md={4} lg={4} className='component'>
				<Card id='component__card'>
					<CardContent>
						<div style={{textAlign: 'left'}}>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Manager: {manager}
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={12} md={4} lg={4} className='component'>
				<Card id='component__card'>
					<CardContent>
						<div style={{textAlign: 'left'}}>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Manager's Address: {managerAddress}
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={12} md={4} lg={4} className='component'>
				<Card id='component__card'>
					<CardContent>
						<div style={{textAlign: 'left'}}>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Minimum Contribution: {minimumContribution} Wei
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={12} md={4} lg={4} className='component'>
				<Card id='component__card'>
					<CardContent>
						<div style={{textAlign: 'left'}}>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Number of requests: {requestCount}
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={12} md={4} lg={4} className='component'>
				<Card id='component__card'>
					<CardContent>
						<div style={{textAlign: 'left'}}>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Number of Donors: {donors}
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={12} md={4} lg={4} className='component'>
				<Card id='component__card'>
					<CardContent>
						<div style={{textAlign: 'left'}}>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Total Amount donated: {total} Eth
							</Typography>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Balance: {balance} Eth
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={12} md={6} lg={6} className=''>
				<div className='login_form_field'>
					<TextField
						id='amount'
						label='Amount'
						type='tet'
						variant='outlined'
						fullWidth
						size='small'
						InputProps={{style: {color: 'white', borderColor: 'white !important'}}}
						InputLabelProps={{style: {color: 'white', border: 'white'}}}
					/>
				</div>
			</Grid>
		</Grid>
	);
};
export default SingleCampaign;
