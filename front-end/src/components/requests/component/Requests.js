import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import CreateRequest from './CreateRequest';
import Button from '@material-ui/core/Button';
import web3 from '../../../web3/web3';
import Campaign from '../../../web3/campaign';
import Typography from '@material-ui/core/Typography';

const Requests = () => {
	const address = window.location.href.split('/')[4];
	const campaign = Campaign(address);
	const [allRequests, setAllRequests] = useState([]);
	const [donorsCount, setDonorsCount] = useState('');
	const [formLoading, setFormLoading] = useState(false);

	const [loading, setLoading] = useState(true);
	async function getRequests() {
		setLoading(true);
		const requestCount = await campaign.methods.getRequestsCount().call();
		const approversCount = await campaign.methods.approversCount().call();
		setDonorsCount(approversCount);
		const requests = await Promise.all(
			Array(parseInt(requestCount))
				.fill()
				.map((element, index) => {
					return campaign.methods.requests(index).call();
				})
		);
		setAllRequests(requests);
		setLoading(false);
	}

	const onApprove = async (index) => {
		setFormLoading(true);
		const campaign = Campaign(address);
		try {
			await window.ethereum.enable();
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.approveRequest(index).send({from: accounts[0]});
			setFormLoading(false);
			window.location.reload();
		} catch (err) {
			setFormLoading(false);
		}
	};
	const onFinalize = async (index) => {
		setFormLoading(true);
		const campaign = Campaign(address);
		try {
			await window.ethereum.enable();
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.finalizeRequest(index).send({from: accounts[0]});
			setFormLoading(false);
			window.location.reload();
		} catch (err) {
			setFormLoading(false);
		}
	};

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
			<Grid container id='container' item xs={6} sm={6} lg={10} md={10}>
				<Typography variant='h5'>Requests</Typography>
			</Grid>

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
								Recipient's Address
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}>
								Approval Count
							</TableCell>
							<TableCell align='right' style={{color: 'white'}}></TableCell>
							<TableCell align='right' style={{color: 'white'}}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{allRequests.map((request, index) => (
							<TableRow key={index}>
								<TableCell component='th' scope='row' style={{color: 'white'}}>
									{index + 1}
								</TableCell>
								<TableCell align='right' style={{color: 'white'}}>
									{request.description}
								</TableCell>
								<TableCell align='right' style={{color: 'white'}}>
									{web3.utils.fromWei(request.amount, 'ether')}
								</TableCell>
								<TableCell align='right' style={{color: 'white'}}>
									{request.recipient}
								</TableCell>
								<TableCell align='right' style={{color: 'white'}}>
									{request.approvalCount}
								</TableCell>
								<TableCell align='right' style={{color: 'white'}}>
									<Button
										variant='outlined'
										color='primary'
										disabled={request.complete}
										onClick={() => {
											onApprove(index);
										}}
									>
										{formLoading ? <CircularProgress style={{color: 'white'}} /> : 'Approve'}
									</Button>
								</TableCell>
								<TableCell align='right' style={{color: 'white'}}>
									<Button
										variant='outlined'
										color='secondary'
										disabled={request.complete || request.approvalCount < donorsCount / 2}
										onClick={() => {
											onFinalize(index);
										}}
									>
										{formLoading ? <CircularProgress style={{color: 'white'}} /> : 'Finalize'}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};
export default Requests;
