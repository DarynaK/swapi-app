import React, {useState} from 'react';
import '../styles/login.scss';
import { useFirebase } from 'react-redux-firebase';
import {useDispatch} from 'react-redux';
import {userSuccessSignUp, userFailureSignUp, userSuccessLogIn, userFailureLogIn} from '../store/actions/auth';

const Login = () => {
    const firebase = useFirebase();
    const dispatch = useDispatch();

    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleSignUp, setToggleSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const showSignUp = () => {
        setToggleLogin(true);
        setToggleSignUp(true)
    };

    const showLogin = () => {
        setToggleLogin(false);
        setToggleSignUp(false);
    };

    const classLogIn = toggleLogin?'login-wrapper overlay':'login-wrapper';
    const classSignUp = toggleSignUp?'sign-up-wrapper slide-away': 'sign-up-wrapper';

    const getEmail = e => {
        setEmail(e.target.value);
    };

    const getPassword = e => {
        setPassword(e.target.value);
    };

    const getName = e => {
        setName(e.target.value);
    };

    const getLastName = e => {
        setLastName(e.target.value);
    };

    const getPhone = e => {
        setPhone(e.target.value);
    };

    const signUp = e => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(data => {
                return firebase.firestore().collection('users').doc(data.user.uid).set({
                    name: name,
                    lastName: lastName,
                    email: data.user.email,
                });
            })
            .then(() => {
                dispatch(userSuccessSignUp({name, lastName, email}));
            })
            .catch(err =>
                dispatch(userFailureSignUp(err))
            );
    };

    const logIn = e => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                dispatch(userSuccessLogIn());
                console.log('You are logged in', res)
            })
            .catch(err => {
                dispatch(userFailureLogIn());
                    console.log('Something went wrong', err.message)
                }
            );
    };

    return (
        <div className='login-page'>
            <div className="login-page-form">
                <div className="login-page-buttons">
                    <button className="sign-up-button" onClick={showSignUp}>Sign up</button>
                    <button className="login-button" onClick={showLogin}>Log in</button>
                </div>
                <div className="login-form-containers">
                    <div className="sign-up form-container">
                        <div className={classSignUp}>
                            <form className='submit-form' onSubmit={signUp}>
                                <input type="text" name='name' placeholder='First Name' value={name} onChange={getName}/>
                                <input type="text" name='last-name' placeholder='Last Name' value={lastName} onChange={getLastName}/>
                                <input type="text" name='phone' placeholder='Phone' value={phone} onChange={getPhone}/>
                                <input type="email" name='email' placeholder='Email' value={email} onChange={getEmail}/>
                                <input type="password" name='password' placeholder='Password' value={password} onChange={getPassword}/>
                                <input type="submit" value='Submit'/>
                            </form>
                        </div>
                    </div>
                    <div className="login form-container">
                        <div className={classLogIn} onSubmit={logIn}>
                            <form className='login-form'>
                                <input type="email" name='email' placeholder='Email' value={email} onChange={getEmail}/>
                                <input type="password" name='password' placeholder='Password' value={password} onChange={getPassword}/>
                                <input type="submit" value='Log in'/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;