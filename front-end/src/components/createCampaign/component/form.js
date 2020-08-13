import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
// import Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import web3 from '../../../web3/web3';
import factory from '../../../web3/factory';

function Form() {
	const history = useHistory();
	const name = useSelector((state) => state.name);

	const [description, setDescription] = useState('');
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setErrorMessage('');
		try {
			await window.ethereum.enable();
			const accounts = await web3.eth.getAccounts();
			await factory.methods.createCampaign(value, description, name).send({from: accounts[0]});
			setLoading(false);
			history.push('/');
		} catch (err) {
			setErrorMessage(err);
			setLoading(false);
		}
	};
	return (
		<div className='create__form'>
			<form onSubmit={handleSubmit} noValidate>
				<div className='form_field'>
					<TextField
						id='description'
						label='Description'
						type='text'
						variant='outlined'
						fullWidth
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						size='small'
						InputProps={{style: {color: 'white', borderColor: 'white !important'}}}
						InputLabelProps={{style: {color: 'white', border: 'white'}}}
					/>
				</div>
				<div className='form_field'>
					<TextField
						id='minimumContribution'
						label='Minimum Contribution (in wei)'
						type='text'
						variant='outlined'
						fullWidth
						size='small'
						InputProps={{
							style: {color: 'white', borderColor: 'white !important'},
						}}
						InputLabelProps={{style: {color: 'white', border: 'white'}}}
						value={value}
						onChange={(event) => setValue(event.target.value)}
					/>
				</div>

				{errorMessage && (
					<div>
						<Typography variant='caption' style={{color: 'red'}}>
							{errorMessage}
						</Typography>
					</div>
				)}

				<Button
					variant='contained'
					color='primary'
					style={{marginTop: 10, background: '#3f51b5', color: 'white'}}
					size='small'
					type='submit'
				>
					{loading ? <CircularProgress style={{color: 'white'}} /> : 'Create'}
				</Button>
			</form>
		</div>
	);
}

export default Form;
