import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth';
import '../styles/nav.scss';

const Header = () => {

    const logout = () => {
        Auth.signout();
    };

        return(
            <div className='nav-container'>
                <Link to='/' >Home</Link>
                <Link to='public' >Public</Link>
                <Link to='private' >Private</Link>
                <Link to='login' >Login</Link>
                <button className='logout-button' onClick={logout}>Logout</button>
            </div>
        );

};
export default Header;