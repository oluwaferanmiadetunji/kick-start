import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Campaign from '../../../web3/campaign';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import web3 from '../../../web3/web3';
import CreateRequest from './CreateRequest';

const Requests = () => {
	const address = window.location.href.split('/')[4];
	const campaign = Campaign(address);

	const [loading, setLoading] = useState(false);

	async function getRequests() {
		const requestCount = await campaign.methods.getRequestsCount().call();
		const approversCount = await campaign.methods.approversCount().call();
		const requests = await Promise.all(
			Array(parseInt(requestCount))
				.fill()
				.map((element, index) => {
					return campaign.methods.requests(index).call();
				})
		);
	}

	const openModal = () => {};

	useEffect(() => {
		getRequests();
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
		<Grid container id='container' item xs={12} sm={12} lg={10} md={10}>
			<CreateRequest address={address} />
			<TableContainer component={Paper} id='table'>
				<Table style={{color: 'white'}}>
					<TableHead>
						<TableRow>
							<TableCell style={{color: 'white'}}>S/N</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								Description
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								Amount (in Eth)
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								Recipient
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								Approval Count
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}></TableCell>
							<TableCell align='right' style={{color: 'white'}}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell component='th' scope='row' style={{color: 'white'}}>
								row.name
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								row.calories
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								row.fat
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								row.carbs
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								row.protein
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								row.carbs
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								row.protein
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};
export default Requests;
