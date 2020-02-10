import React from 'react';
import Auth from "../Auth";
import '../styles/login.scss';

const Login = () => {

    const login = () => {
        Auth.authenticate();
    };
    return (
        <div className='login-page'>
            <div className="login-page-form">
                <div className="login-page-buttons">
                    <button className="sign-up-button">Sign up</button>
                    <button className="login-button">Login</button>
                </div>
                <div className="login-form-containers">
                    <div className="sign-up form-container">
                        <p>Sign up if you haven't already</p>
                        <form className='submit-form'>
                            <label htmlFor="name">First Name</label>
                            <input type="text" name='name'/>
                            <label htmlFor="last-name">Last Name</label>
                            <input type="text" name='last-name'/>
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email'/>
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password'/>
                            <input type="submit" value='Login'/>
                        </form>
                    </div>
                    <div className="login form-container">
                        <p>Login</p>
                        <form className='login-form'>
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email'/>
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password'/>
                            <input type="submit" value='Login'/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;