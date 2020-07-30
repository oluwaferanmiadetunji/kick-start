import React from 'react';
import Layout from '../../layout';
import Page from './LandingPage';

const LandingPageWithLayout = Layout(Page);

function LandingPage() {
	return <LandingPageWithLayout />;
}

export default LandingPage;
