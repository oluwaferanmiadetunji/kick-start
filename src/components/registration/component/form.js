import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { Gender } from './constants';
import actions from '../actions';
import { useSelector, useDispatch } from 'react-redux';

function Form() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [gender, setGender] = useState('');
	const dispatch = useDispatch();
	const { loading, errors, message } = useSelector((state) => state.register);
	console.log(errors, message);

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(actions.registerUser({ email, name, phone, password, confirmPassword, gender }));
	};

	return (
		<div className='register__form__div'>
			<div className='register_text'>
				<p>We help bring your projects to life by connecting you with potential Contributors.</p>
				<p>Sign Up now</p>
			</div>
			<div className='register__form'>
				<form onSubmit={handleSubmit}>
					<div className='register_form_field'>
						<TextField
							id='fullname'
							label='Full Name'
							type='text'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
							value={name}
							onChange={(event) => {
								setName(event.target.value);
							}}
						/>
					</div>
					<div className='register_form_field'>
						<TextField
							id='email'
							label='Email'
							type='email'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
							value={email}
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
					</div>
					<div className='register_form_field'>
						<TextField
							id='phone_number'
							label='Phone Number'
							type='tel'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
							value={phone}
							onChange={(event) => {
								setPhone(event.target.value);
							}}
						/>
					</div>
					<div className='register_form_field'>
						<TextField
							id='password'
							type='password'
							label='Password'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
							value={password}
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
					</div>
					<div className='register_form_field'>
						<TextField
							id='confirmPassword'
							type='password'
							label='Confirm Password'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
							value={confirmPassword}
							onChange={(event) => {
								setConfirmPassword(event.target.value);
							}}
						/>
					</div>
					<div className='register_form_field'>
						<TextField
							id='gender'
							select
							label='Gender'
							value={gender}
							onChange={(event) => {
								setGender(event.target.value);
							}}
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
						>
							{Gender.map((option) => (
								<MenuItem key={option.key} value={option.value}>
									{option.key}
								</MenuItem>
							))}
						</TextField>
					</div>

					<Button variant='contained' color='primary' style={{ marginTop: 10 }} size='small'>
						{loading ? <CircularProgress style={{ color: 'white' }} /> : 'Register'}
					</Button>
					<div className='register_form_footer'>
						<Typography>
							Already have an account ?&nbsp;
							<Link to='/login' style={{ color: 'red' }}>
								Click here
							</Link>
						</Typography>
						<Typography>
							Forgot password ?&nbsp;
							<Link to='/reset' style={{ color: 'red' }}>
								Click here
							</Link>
						</Typography>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Form;
