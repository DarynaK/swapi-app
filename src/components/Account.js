import React from 'react';
import '../styles/account.scss';
import {Link, Route} from "react-router-dom";
import MyInfo from "./MyInfo";
import MyLists from "./MyLists";
import {useRouteMatch, Switch} from "react-router-dom";
import Login from "./Login";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import File from './MyInfo'

const Account = () => {
    let { path, url } = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>
        </div>
    );
};

export default Account;