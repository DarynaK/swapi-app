import React from 'react';
import '../styles/account.scss';
import {Link, Route} from "react-router-dom";
import MyInfo from "./MyInfo";
import MyLists from "./MyLists";

const Account = ({match}) => {
    console.log({match})
    return (
        <div className='account-page-container'>
            <Link to={`account`}>Account</Link>
            <Link to={`${match.url}/my-info`}>My Info</Link>
            <Link to={`${match.url}/my-lists`}>My Lists</Link>
            <Route exact path={`account`} component={Account}/>
            <Route exact path={`${match.path}/my-info`} component={MyInfo}/>
            <Route exact path={`${match.path}/my-lists`} component={MyLists}/>
        </div>
    );
};

export default Account;