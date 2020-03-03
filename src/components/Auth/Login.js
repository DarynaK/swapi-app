import React, {useState} from 'react';
import '../../styles/login.scss';
import {useFirebase} from 'react-redux-firebase';
import {useDispatch} from 'react-redux';
import {userSuccessLogIn, userFailureLogIn} from '../../store/actions/auth';
import {Link} from "react-router-dom";
import {useHistory} from "react-router";

const Login = () => {
    const firebase = useFirebase();
    const dispatch = useDispatch();
    let history = useHistory();


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

    const getFormData = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const emailLogInValidation = () => {
        let emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        let isEmptyEmail;
        if (formData.email === '') {
            isEmptyEmail = false;
            inputValidation(isEmptyEmail, 'emailLogInError', 'Please fill in the input field');
            return isEmptyEmail;
        } else {
            inputValidation(emailTest, 'emailLogInError', 'Please enter correct email');
            return emailTest;
        }
    };

    const logInEmptyInputCheck = (e) => {
        let formInputs = Array.from(e.target.children);
        let validationResult;
        let inputRes = formInputs.map(el => {
            validationResult = el.value !== '';
            inputValidation(validationResult, el.name + 'LogInError', 'Please fill in the input field');
            return validationResult;
        });
        return inputRes.every(v => v === inputRes[0]);
    };

    const inputValidation = (state, fieldName, errorMessage) => {
        if (!state) {
            setFormError(prevState => ({
                ...prevState,
                [fieldName]: errorMessage,
            }));
        } else {
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

    const logIn = e => {
        e.preventDefault();
        if (logInFormValidation(e)) {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
                .then(res => {
                    dispatch(userSuccessLogIn());
                    setFormError(prevState => ({
                        ...prevState,
                        logInError: '',
                    }));
                    history.push("/account");
                    console.log('You are logged in', res);
                })
                .catch(err => {
                        dispatch(userFailureLogIn());
                        inputValidation(false, 'logInError', err.message);
                    }
                );
        }
    };

    return (
        <div className='login-page'>
            <div className="login form-container">
                <form className='login-form' onSubmit={logIn} noValidate>
                    <p>LOGIN</p>
                    <input type="email" name='email' placeholder='Email' value={formData.email}
                           className={formError.emailLogInError || formError.logInError ? 'errorInputStyle' : null}
                           onChange={getFormData}/>
                    {formError.emailLogInError && <p className='errorMsg'>{formError.emailLogInError}</p>}
                    <input type="password" name='password' placeholder='Password' value={formData.password}
                           className={formError.passwordLogInError || formError.logInError ? 'errorInputStyle' : null}
                           onChange={getFormData}/>
                    {formError.passwordLogInError && <p className='errorMsg'>{formError.passwordLogInError}</p>}
                    <input type="submit" value='Log in'/>
                    {formError.logInError && <p className='errorMsg'>{formError.logInError}</p>}
                </form>
                <Link to='sign-up'>Create an Account</Link>
            </div>
        </div>
    )
};

export default Login;