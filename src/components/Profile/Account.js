import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import React from "react";
import MyLists from './MyLists'
import MyInfo from './MyInfo';
import { useSelector } from 'react-redux';
import '../../styles/account.scss'
import AccountIcon from '../../assets/account.svg';
import InfoIcon from '../../assets/document.svg';
import ListIcon from '../../assets/heart.svg';

const Account = () => {
    let { path, url } = useRouteMatch();
    const userName = useSelector(state => state.firebase.profile.name);

    return (
        <div className='account-container main-wrapper'>
            <h2>Hi, {userName}</h2>
            <div className="content">
                <div className="side-nav">
                    <ul>
                        <li>
                            <Link to={`${url}`}>
                                <img src={AccountIcon} alt="account"/>
                                <div className="link-wrapper">
                                    <p>My Account</p>
                                    <p>Welcome to your account</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={`${url}/info`}>
                                <img src={InfoIcon} alt="info"/>
                                <div className="link-wrapper">
                                    <p>My Info</p>
                                    <p>Personal info</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={`${url}/lists`}>
                                <img src={ListIcon} alt="lists"/>
                                <div className="link-wrapper">
                                    My Lists
                                    <p>View and manage lists</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="account-content">
                    <Switch>
                        <Route exact path={path}>
                            <div className="account-introduction">
                                <h3>Welcome to <br /> Your Account.</h3>
                            </div>
                        </Route>
                        <Route path={`${path}/info`} component={MyInfo}/>
                        <Route path={`${path}/lists`} component={MyLists}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Account;