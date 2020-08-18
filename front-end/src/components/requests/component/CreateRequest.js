import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import web3 from '../../../web3/web3';
import Campaign from '../../../web3/campaign';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function FormDialog({address}) {
	const [open, setOpen] = useState(false);
	const [description, setDescription] = useState('');
	const [value, setValue] = useState('');
	const [recipient, setRecipient] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setErrorMessage('');

		const campaign = Campaign(address);
		try {
			await window.ethereum.enable();
			const accounts = await web3.eth.getAccounts();
			await campaign.methods
				.createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
				.send({from: accounts[0]});
			setLoading(false);
			window.location.reload();
		} catch (err) {
			if (err.message === 'MetaMask Tx Signature: User denied transaction signature.') {
				setErrorMessage('You cancelled the transaction');
			} else {
				setErrorMessage('Oops! Something went wrong');
				console.log(err.message);
			}
			setLoading(false);
		}
	};

	return (
		<div>
			<Button variant='outlined' color='secondary' onClick={handleClickOpen} style={{marginBottom: 30}}>
				Create Request
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'> Create request </DialogTitle>
				<DialogContent style={{width: '30vw'}}>
					<div className='login_form_field'>
						<TextField
							id='description'
							label='Description'
							type='text'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{style: {color: 'white', borderColor: 'white !important'}}}
							InputLabelProps={{style: {color: 'white', border: 'white'}}}
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
					</div>
					<div className='login_form_field'>
						<TextField
							id='value'
							label='Value (in Eth)'
							type='text'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{style: {color: 'white', borderColor: 'white !important'}}}
							InputLabelProps={{style: {color: 'white', border: 'white'}}}
							value={value}
							onChange={(event) => setValue(event.target.value)}
						/>
					</div>
					<div className='login_form_field'>
						<TextField
							id='recipient'
							label='Recipient'
							type='text'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{style: {color: 'white', borderColor: 'white !important'}}}
							InputLabelProps={{style: {color: 'white', border: 'white'}}}
							value={recipient}
							onChange={(event) => setRecipient(event.target.value)}
						/>
					</div>
				</DialogContent>
				{errorMessage && (
					<div>
						<Typography variant='caption' style={{color: 'red', textAlign: 'center'}}>
							{errorMessage}
						</Typography>
					</div>
				)}
				<DialogActions>
					<Button onClick={handleClose} color='secondary' variant='outlined'>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						color='primary'
						variant='outlined'
						disabled={!description || !value || !recipient}
					>
						{loading ? <CircularProgress style={{color: 'white'}} /> : 'Create'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
