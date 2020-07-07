import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.scss';
import {useFirebase} from "react-redux-firebase";
import {useDispatch, useSelector} from 'react-redux';
import {userLogOut} from '../store/actions/auth';

const Header = (props) => {
    const isLoggedIn = useSelector(state => state.firebase.profile.isEmpty);
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    console.log(props.scrollValue)
    const logOut = () => {
        firebase.auth().signOut()
            .then(() => dispatch(userLogOut()));
    };

    const openMobNav = () => {
        return !isOpen?setIsOpen(true):setIsOpen(false);
    };

        return(
            <div className={isOpen?'nav-container open':'nav-container'} style={{background:props.scrollValue>100?'#ffffff':null}}>
                <div className="mobile-nav-container" onClick={openMobNav}>
                    <div className={isOpen?'icon-line line-one':'icon-line'}>

                    </div>
                    <div className={isOpen?'icon-line line-two':'icon-line'}>

                    </div>
                    <div className={isOpen?'icon-line line-three':'icon-line'}>

                    </div>
                </div>
                <div className={isOpen?'link-container show-nav':'link-container'}>
                    <Link to='/'>Home</Link>
                    <Link to='/public' >Public</Link>
                    <Link to='/account' style={{display:isLoggedIn?'none':'block'}}>My Account</Link>
                    <Link to='/login' style={{display:isLoggedIn?'block':'none'}}>Login</Link>
                    <button className='logout-button' style={{display:isLoggedIn?'none':'flex'}} onClick={logOut}>Logout</button>
                </div>
            </div>
        );

};
export default Header;