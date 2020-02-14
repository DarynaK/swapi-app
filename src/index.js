import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import { createStore, combineReducers, compose } from 'redux';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase';

const fbConfig = {
    apiKey: "AIzaSyAJcSTtdSEBJ54xhPN14XZ8C73THSyllgo",
    authDomain: "sw-project-cd78d.firebaseapp.com",
    databaseURL: "https://sw-project-cd78d.firebaseio.com",
    projectId: "sw-project-cd78d",
    storageBucket: "sw-project-cd78d.appspot.com",
    messagingSenderId: "427523026976",
    appId: "1:427523026976:web:11de4bbf798c289cb3cc45"
};

const rrfConfig = {
    userProfile: 'users',
};

firebase.initializeApp(fbConfig);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
});

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
    <BrowserRouter>
    <App />
    </BrowserRouter>,
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
