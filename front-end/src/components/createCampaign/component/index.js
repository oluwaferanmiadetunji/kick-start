import React from 'react';
import Layout from '../../layout';
import Create from './form';
import './style.css';

const CreateCampaignWithLayout = Layout(Create);

function CreateCampaign() {
	return <CreateCampaignWithLayout />;
}

export default CreateCampaign;
