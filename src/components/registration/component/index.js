import React from 'react';
import Layout from '../../layout';
import Register from './form';
import './style.css';

const RegisterWithLayout = Layout(Register);

function RegisterPage() {
	return <RegisterWithLayout />;
}

export default RegisterPage;
