import React from 'react';
import Layout from '../../layout';
import Page from './Campaign';
import './style.css';

const CampaignPageWithLayout = Layout(Page);

function SingleCampaign() {
	return <CampaignPageWithLayout />;
}

export default SingleCampaign;
