import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
	return (
		<>
			<NavLink to='/'>
				<span className='navigation__item'>Home</span>
			</NavLink>
			<NavLink to='/login'>
				<span className='navigation__item'>Login</span>
			</NavLink>
		</>
	);
};

export default Nav;
