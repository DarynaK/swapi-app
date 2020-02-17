import React, {useState} from 'react';
// import Auth from "../Auth";
import '../styles/login.scss';
import { useFirebase } from 'react-redux-firebase';

const Login = () => {
    const firebase = useFirebase();

    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleSignUp, setToggleSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const signUp = e => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res => console.log(res)).catch(err => console.log(err))
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
                            <form className='submit-form'>
                                <input type="text" name='name' placeholder='First Name'/>
                                <input type="text" name='last-name' placeholder='Last Name'/>
                                <input type="email" name='email' placeholder='Email'/>
                                <input type="password" name='password' placeholder='Password'/>
                                <input type="submit" value='Submit'/>
                            </form>
                        </div>
                    </div>
                    <div className="login form-container">
                        <div className={classLogIn}>
                            <form className='login-form' onSubmit={signUp}>
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