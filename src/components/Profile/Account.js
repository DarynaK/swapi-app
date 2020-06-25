import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import React, {useState} from "react";
import MyLists from './MyLists'
import MyInfo from './MyInfo';
import { useSelector } from 'react-redux';
import '../../styles/account.scss'
import AccountIcon from '../../assets/account.svg';
import InfoIcon from '../../assets/document.svg';
import ListIcon from '../../assets/heart.svg';
import firebase from 'firebase/app';
import 'firebase/storage';

const Account = () => {
    let { path, url } = useRouteMatch();
    const userName = useSelector(state => state.firebase.profile.name);
    const userAvatar = useSelector(state => state.firebase.profile.avatar);
    const uId = useSelector(state => state.firebase.auth.uid);
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uId);


    const uploadFile = (e) => {
        e.preventDefault();
        let storageRef = firebase.storage().ref();
        let file = e.target.files[0];
        let thisRef = storageRef.child(e.target.files[0].name);
        thisRef.put(file).then(function (snapshot) {
            storageRef.child(file.name).getDownloadURL().then(function (url) {
                docRef.set({
                    'avatar': url,
                },{ merge: true }).then(res => console.log('saved logo'));
            });
        });
    };

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
                                <div className="avatar-container">
                                    <input type="file" id="files" onChange={uploadFile} name="files[]" multiple/>
                                    <img src={userAvatar} className="user-avatar" alt="user-avatar"/>
                                </div>
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