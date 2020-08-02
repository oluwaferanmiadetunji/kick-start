import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

// import Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from 'react-router-dom';
// import constants
import { Gender } from './constants';
// import the redux actions
import action from '../actions';

function Form() {
	// initialize dispatch
	const dispatch = useDispatch();
	// get global state variables
	const loading = useSelector((state) => state.registerLoading);
	const { status, message } = useSelector((state) => state.registerStatus);

	// initialize component state
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [gender, setGender] = useState('');
	const [error, setError] = useState({});

	// set email regular expression
	const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	// function to handle user input on name
	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	// function to handle user input on email
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	// function to handle user input on phone number
	const handlePhoneNumberChange = (event) => {
		// restrict user from adding anything other than numbers
		const pattern = /^\d+$/;
		if (pattern.test(event.target.value)) {
			setPhone(event.target.value);
		}
		if (phone.length === 1 && event.target.value === '') {
			setPhone(event.target.value);
		}
	};

	// function to handle user input on password
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	// function to handle user input on confir password
	const handleConfirmPasswordChange = (event) => {
		setConfirmPassword(event.target.value);
	};

	// function to handle user input on gender
	const handleGenderChange = (event) => {
		setGender(event.target.value);
	};

	// function to submit the form
	const handleSubmit = (event) => {
		event.preventDefault();
		setError({});

		// check if name field is empty
		if (name.trim() === '') {
			setError({ name: 'You must enter a name!' });
		}

		// check if email field is empty
		else if (email.trim() === '') {
			setError({ email: 'You must enter an email!' });
		}

		// check if email is a valid email
		else if (!email.match(re)) {
			setError({ email: 'You must enter a valid email!' });
		}

		// check if phone is empty
		else if (phone.trim() === '') {
			setError({ phone: 'You must enter a phone number!' });
		}

		// check if gender is empty
		else if (gender.trim() === '') {
			setError({ gender: 'You must select your gender!' });
		}

		// check if password is empty
		else if (password.trim() === '') {
			setError({ password: 'You must enter a password!' });
		}

		// check if confirm password is empty
		else if (confirmPassword.trim() === '') {
			setError({ confirmPassword: 'You must enter a password!' });
		}

		// check if password and confirm password match
		else if (password !== confirmPassword) {
			setError({ password: 'Passwords do not match!', confirmPassword: 'Passwords do not match!' });
		}

		// proceed with the action
		else {
			dispatch(action.registerLoading(true));
			dispatch(action.registerUser({ name, email, phone, password, gender }));
		}
	};

	useEffect(() => {}, [message, status]);

	return status ? (
		<Redirect to='/login' />
	) : (
		<div className='register__form__div'>
			<div className='register_text'>
				<p>We help bring your projects to life by connecting you with potential Contributors.</p>
				<p>Sign Up now</p>
			</div>
			<div className='register__form'>
				<form onSubmit={handleSubmit} noValidate>
					<div className='register_form_field'>
						<TextField
							error={error.name ? true : false}
							helperText={error.name}
							id='fullname'
							label='Full Name'
							type='text'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
							value={name}
							onChange={handleNameChange}
						/>
					</div>
					<div className='register_form_field'>
						<TextField
							error={error.email ? true : false}
							helperText={error.email}
							id='email'
							label='Email'
							type='email'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
							value={email}
							onChange={handleEmailChange}
						/>
					</div>
					<div className='register_form_field'>
						<TextField
							error={error.phone ? true : false}
							helperText={error.phone}
							id='phone_number'
							label='Phone Number'
							type='tel'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
							value={phone}
							onChange={handlePhoneNumberChange}
						/>
					</div>

					<div className='register_form_field'>
						<TextField
							error={error.gender ? true : false}
							helperText={error.gender}
							id='gender'
							select
							label='Gender'
							value={gender}
							onChange={handleGenderChange}
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
					<div className='register_form_field'>
						<TextField
							error={error.password ? true : false}
							helperText={error.password}
							id='password'
							type='password'
							label='Password'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>
					<div className='register_form_field'>
						<TextField
							error={error.confirmPassword ? true : false}
							helperText={error.confirmPassword}
							id='confirmPassword'
							type='password'
							label='Confirm Password'
							variant='outlined'
							fullWidth
							size='small'
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
							value={confirmPassword}
							onChange={handleConfirmPasswordChange}
						/>
					</div>

					{message && (
						<div>
							<Typography variant='caption'>{message}</Typography>
						</div>
					)}

					<Button
						variant='contained'
						color='primary'
						style={{ marginTop: 10, background: '#3f51b5', color: 'white' }}
						size='small'
						type='submit'
						disabled={loading}
					>
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
