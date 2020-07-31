import React from 'react';
import Layout from '../../layout';
import Login from './form';
import './style.css';

const LoginWithLayout = Layout(Login);

function LoginPage() {
	return <LoginWithLayout />;
}

export default LoginPage;
