import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import factory from '../../../web3/factory';

const LandingPage = () => {
  const [campaigns, setCampaigns] = useState([]);

	useEffect(() => {
		async function getAllCampaigns() {
      const AllCampaigns = await factory.methods.getDeployedCampaigns().call();
      console.log(AllCampaigns);
			setCampaigns(AllCampaigns);
		}
		getAllCampaigns();
	}, []);

	return (
		<Grid container id='container' spacing={4}>
			<Grid item xs={12} sm={12} md={6} lg={6} className='component'>
				<Card id='component__card'>
					<CardContent>
						<div style={{textAlign: 'left'}}>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Manager: Adetunji Oluwaferanmi
							</Typography>
							<Typography variant='body1' style={{marginBottom: 10}}>
								Total: 100 Ether
							</Typography>
							<Typography variant='body1'>Balance: 100 Ether</Typography>
						</div>
						<Button style={{background: 'red', color: 'white', marginTop: 10, textAlign: 'center'}} size='small'>
							<Link to='/'>
								<KeyboardArrowRightIcon />
							</Link>
						</Button>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default LandingPage;
