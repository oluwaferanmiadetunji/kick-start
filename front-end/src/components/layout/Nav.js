import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Nav = () => {
	const isUserLoggedIn = useSelector(({isUserLoggedIn}) => isUserLoggedIn);
	return isUserLoggedIn ? (
		<>
			<NavLink exact to='/' activeClassName='active' className='navigation__item'>
				<span>Home</span>
			</NavLink>
			<NavLink exact to='/campaigns/new' activeClassName='active' className='navigation__item'>
				<span>Create Campaign</span>
			</NavLink>
		</>
	) : (
		<>
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
