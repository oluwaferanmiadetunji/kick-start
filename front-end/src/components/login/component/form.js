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
// import the redux actions
import action from '../actions';

function Form() {
	// initialize dispatch
	const dispatch = useDispatch();
	// get global state variables
	const loading = useSelector((state) => state.registerLoading);
	const status = useSelector((state) => state.registerStatus);
	const message = useSelector((state) => state.registerMessage);

	// initialize component state
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState({});

	// set email regular expression
	const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	// function to handle user input on email
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	// function to handle user input on password
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	// function to submit the form
	const handleSubmit = (event) => {
		event.preventDefault();
		setError({});

		// check if email field is empty
		if (email.trim() === '') {
			setError({ email: 'You must enter an email!' });
		}

		// check if email is a valid email
		else if (!email.match(re)) {
			setError({ email: 'You must enter a valid email!' });
		}

		// check if password is empty
		else if (password.trim() === '') {
			setError({ password: 'You must enter a password!' });
		}

		// proceed with the action
		else {
			dispatch(action.registerLoading(true));
			dispatch(action.registerUser({ email, password }));
		}
	};

	useEffect(() => {}, [message, status]);

	return status === 'success' ? (
		<Redirect to='/login' />
	) : (
		<div className='login__form__div'>
			<div className='login_text'>
				<p>We help bring your projects to life by connecting you with potential Contributors.</p>
				<p>Sign Up now</p>
			</div>
			<div className='login__form'>
				<form onSubmit={handleSubmit} noValidate>
					<div className='login_form_field'>
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

					<div className='login_form_field'>
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

					{message && (
						<div>
							<Typography variant='caption' style={{ color: 'red' }}>
								{message}
							</Typography>
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
						{loading ? <CircularProgress style={{ color: 'white' }} /> : 'Login'}
					</Button>
					<div className='login_form_footer'>
						<Typography>
							Don't have an account ?&nbsp;
							<Link to='/register' style={{ color: 'red' }}>
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
