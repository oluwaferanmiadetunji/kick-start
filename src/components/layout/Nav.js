import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
	return (
		<>
			<NavLink exact to='/' activeClassName='active' className='navigation__item'>
				<span>Home</span>
			</NavLink>
			<NavLink exact to='/login' activeClassName='active' className='navigation__item'>
				<span>Login</span>
			</NavLink>
			<NavLink exact to='/register' activeClassName='active' className='navigation__item'>
				<span>Register</span>
			</NavLink>
		</>
	);
};

export default Nav;
