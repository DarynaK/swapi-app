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
    const [formData, setFormData] = useState({
        name: {
            value: '',
            error: '',
        },
        lastName: {
            value: '',
            error: '',
        },
        phone: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
    });

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

    const getFormData = e => {
        setFormData({
            ...formData,
            [e.target.name]: {
                ...formData[e.target.name],
                value: e.target.value,
            },
        });
    };

    const formValidation = () => {
        if (formData.name.value === '') {
            setFormData({
                ...formData,
                name: {
                    ...formData.name,
                    error: 'hjk'
                },
            });
        }else {
            setFormData({
                ...formData,
                name: {
                    ...formData.name,
                    error: '',
                },
            });
        }
    };

    const signUp = e => {
        e.preventDefault();
      formValidation();

        // firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
        //     .then(data => {
        //         return firebase.firestore().collection('users').doc(data.user.uid).set({
        //             name: formData.name,
        //             lastName: formData.lastName,
        //             email: data.user.email,
        //         });
        //     })
        //     .then(() => {
        //         dispatch(userSuccessSignUp({name: formData.name, lastName: formData.lastName, email: formData.email}));
        //     })
        //     .catch(err =>
        //         dispatch(userFailureSignUp(err))
        //     );
    };

    const logIn = e => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
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
                                <input type="text" name='name' placeholder='First Name' value={formData.name.value} onChange={getFormData}/>
                                {formData.name.error && <p>hjk</p>}
                                <input type="text" name='lastName' placeholder='Last Name' value={formData.lastName.value} onChange={getFormData}/>
                                <input type="text" name='phone' placeholder='Phone' value={formData.phone.value} onChange={getFormData}/>
                                <input type="email" name='email' placeholder='Email' value={formData.email.value} onChange={getFormData}/>
                                <input type="password" name='password' placeholder='Password' value={formData.password.value} onChange={getFormData}/>
                                <input type="submit" value='Submit'/>
                            </form>
                        </div>
                    </div>
                    <div className="login form-container">
                        <div className={classLogIn} onSubmit={logIn}>
                            <form className='login-form'>
                                <input type="email" name='email' placeholder='Email' value={formData.email.value} onChange={getFormData}/>
                                <input type="password" name='password' placeholder='Password' value={formData.password.value} onChange={getFormData}/>
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