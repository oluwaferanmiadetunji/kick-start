import React from 'react';
import Layout from '../../layout';
import Page from './Requests';
import './style.css';

const RequestsPageWithLayout = Layout(Page);

function Requests() {
	return <RequestsPageWithLayout />;
}

export default Requests;
