import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

function Form() {
	return (
		<div className='login__form__div'>
			<div className='login_text'>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error dolor nesciunt obcaecati aspernatur animi
					maxime vitae accusantium inventore ipsum recusandae debitis perspiciatis laudantium sapiente quibusdam
					tempore, quisquam similique id fugit?
				</p>
			</div>
			<div className='login__form'>
				<h2>Login</h2>
				<form>
					<div className='login_form_field'>
						<TextField
							id='email'
							label='Email'
							type='email'
							variant='outlined'
							fullWidth
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
						/>
					</div>
					<div className='login_form_field'>
						<TextField
							id='password'
							type='password'
							label='Password'
							variant='outlined'
							fullWidth
							InputProps={{ style: { color: 'white', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', border: 'white' } }}
						/>
					</div>
					<Button variant='contained' color='primary' style={{ marginTop: 10 }}>
						<CircularProgress style={{ color: 'white' }} />
						Login
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
