import React from 'react';
import Layout from '../../layout';
import Page from './LandingPage';
import './style.css';

const LandingPageWithLayout = Layout(Page);

function LandingPage() {
	return <LandingPageWithLayout />;
}

export default LandingPage;
