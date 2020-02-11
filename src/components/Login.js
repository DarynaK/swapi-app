import React, {useState} from 'react';
// import Auth from "../Auth";
import '../styles/login.scss';

const Login = () => {

    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleSignUp, setToggleSignUp] = useState(false);

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
    // const login = () => {
    //     Auth.authenticate();
    // };

    return (
        <div className='login-page'>
            <div className="login-page-form">
                <div className="login-page-buttons">
                    <button className="sign-up-button" onClick={showSignUp}>Sign up</button>
                    <button className="login-button" onClick={showLogin}>Login</button>
                </div>
                <div className="login-form-containers">
                    <div className="sign-up form-container">
                        <div className={classSignUp}>
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
                    </div>
                    <div className="login form-container">
                        <div className={classLogIn}>
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
        </div>
    )
};

export default Login;