import React from 'react';
import Layout from '../../layout';
import Login from './form';

const LoginWithLayout = Layout(Login);

function LoginPage() {
	return <LoginWithLayout />;
}

export default LoginPage;
