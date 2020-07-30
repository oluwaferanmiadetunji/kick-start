import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<>
			<Link to='/login'>
				<span className='navigation__item'>Login</span>
			</Link>
		</>
	);
};

export default Nav;
