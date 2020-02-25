import React, {useState} from 'react';
import '../styles/login.scss';
import {useFirebase} from 'react-redux-firebase';
import {useDispatch, useSelector} from 'react-redux';
import {userSuccessSignUp, userFailureSignUp, userSuccessLogIn, userFailureLogIn} from '../store/actions/auth';

const Login = () => {
    const firebase = useFirebase();
    const dispatch = useDispatch();

    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleSignUp, setToggleSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState({
        nameError: '',
        lastNameError: '',
        phoneError: '',
        emailError: '',
        passwordError: '',
        emailLogInError: '',
        passwordLogInError: '',
        logInError: '',
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
            [e.target.name]:  e.target.value,
        });
    };

    const emailValidation = () => {
        let emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        let isEmptyEmail;
        if(formData.email === '') {
            isEmptyEmail = false;
            inputValidation(isEmptyEmail,'emailError', 'Please fill in the input field' );
            return isEmptyEmail;
        }else {
             inputValidation(emailTest,'emailError', 'Please enter correct email' );
            return emailTest;
        }
    };

    const emailLogInValidation = () => {
        let emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        let isEmptyEmail;
        if(formData.email === '') {
            isEmptyEmail = false;
            inputValidation(isEmptyEmail,'emailLogInError', 'Please fill in the input field' );
            return isEmptyEmail;
        }else {
            inputValidation(emailTest,'emailLogInError', 'Please enter correct email' );
            return emailTest;
        }
    };

    const phoneValidation = () => {
        let phoneTest = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(formData.phone);
        let isEmptyPhone;
        if(formData.phone === '') {
            isEmptyPhone = false;
            inputValidation(isEmptyPhone,'phoneError', 'Please fill in the input field' );
            return isEmptyPhone;
        }else {
            inputValidation(phoneTest,'phoneError', 'Please enter correct phone' );
            return phoneTest;
        }
    };

    const emptyInputCheck = (e) => {
        let formInputs = Array.from(e.target.children);
        let validationResult;
        let inputRes = formInputs.map(el => {
           validationResult = el.value !== '';
            inputValidation(validationResult,el.name + 'Error', 'Please fill in the input field' );
            return validationResult;
        });
        return inputRes.every(v => v === inputRes[0]);
    };

    const logInEmptyInputCheck = (e) => {
        let formInputs = Array.from(e.target.children);
        let validationResult;
        let inputRes = formInputs.map(el => {
            validationResult = el.value !== '';
            inputValidation(validationResult,el.name + 'LogInError', 'Please fill in the input field' );
            return validationResult;
        });
        return inputRes.every(v => v === inputRes[0]);
    };

    const inputValidation = (state, fieldName, errorMessage) => {
        if(!state) {
            setFormError(prevState => ({
                ...prevState,
                [fieldName]: errorMessage,
            }));
        }else {
            setFormError(prevState => ({
                ...prevState,
                [fieldName]: '',
            }));
        }
    };

    const logInFormValidation = e => {
        let isEmptyLogInForm = logInEmptyInputCheck(e);
        let logInEmailValidation = emailLogInValidation();
        return isEmptyLogInForm && logInEmailValidation;
    };

    const formValidation = e => {
        let isEmpty = emptyInputCheck(e);
        let email =emailValidation();
        let phone = phoneValidation();
        return isEmpty && email && phone;
    };

    const signUp = e => {
        e.preventDefault();
        if(formValidation(e)) {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .then(data => {
                return firebase.firestore().collection('users').doc(data.user.uid).set({
                    name: formData.name,
                    lastName: formData.lastName,
                    email: data.user.email,
                });
            })
                .then(() => {
                    dispatch(userSuccessSignUp({name: formData.name, lastName: formData.lastName, email: formData.email}));
                })
                .catch(err => {
                    inputValidation(false,'emailError', err.message );
                    dispatch(userFailureSignUp(err))
                }
            );
        }
    };

    const logIn = e => {
        e.preventDefault();
        if(logInFormValidation(e)) {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
                .then(res => {
                    dispatch(userSuccessLogIn());
                    console.log('You are logged in', res)
                })
                .catch(err => {
                    dispatch(userFailureLogIn());
                    inputValidation(false,'logInError', err.message );
                        console.log('Something went wrong', err.message)
                    }
                );
        }
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
                            <form className='submit-form' onSubmit={signUp} noValidate>
                                <input type="text" name='name' placeholder='First Name' value={formData.name} className={formError.nameError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.nameError && <p className='errorMsg'>{formError.nameError}</p>}
                                <input type="text" name='lastName' placeholder='Last Name' value={formData.lastName} className={formError.lastNameError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.lastNameError && <p className='errorMsg'>{formError.lastNameError}</p>}
                                <input type="tel" name='phone' placeholder='Phone' value={formData.phone} className={formError.phoneError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.phoneError && <p className='errorMsg'>{formError.phoneError}</p>}
                                <input type="email" name='email' placeholder='Email' value={formData.email} className={formError.emailError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.emailError && <p className='errorMsg'>{formError.emailError}</p>}
                                <input type="password" name='password' placeholder='Password' value={formData.password} className={formError.passwordError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.passwordError && <p className='errorMsg'>{formError.passwordError}</p>}
                                <input type="submit" value='Submit'/>
                            </form>
                        </div>
                    </div>
                    <div className="login form-container">
                        <div className={classLogIn} onSubmit={logIn}>
                            <form className='login-form' noValidate>
                                <input type="email" name='email' placeholder='Email' value={formData.email} className={formError.emailLogInError || formError.logInError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.emailLogInError && <p className='errorMsg'>{formError.emailLogInError}</p>}
                                <input type="password" name='password' placeholder='Password' value={formData.password} className={formError.passwordLogInError || formError.logInError?'errorInputStyle':null} onChange={getFormData}/>
                                {formError.passwordLogInError && <p className='errorMsg'>{formError.passwordLogInError}</p>}
                                <input type="submit" value='Log in'/>
                                {formError.logInError && <p className='errorMsg'>{formError.logInError}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;