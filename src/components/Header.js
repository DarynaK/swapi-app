import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.scss';
import {useFirebase} from "react-redux-firebase";
import {useDispatch, useSelector} from 'react-redux';
import {userLogOut} from '../store/actions/auth';

const Header = () => {
    const isLoggedIn = useSelector(state => state.firebase.profile.isEmpty);
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const logOut = () => {
        firebase.auth().signOut()
            .then(() => dispatch(userLogOut()));
    };

        return(
            <div className='nav-container'>
                <Link to='/'>Home</Link>
                <Link to='public' >Public</Link>
                <Link to='private' style={{display:isLoggedIn?'none':'block'}}>Private</Link>
                <Link to='login' style={{display:isLoggedIn?'block':'none'}}>Login</Link>
                <button className='logout-button' style={{display:isLoggedIn?'none':'flex'}} onClick={logOut}>Logout</button>
            </div>
        );

};
export default Header;