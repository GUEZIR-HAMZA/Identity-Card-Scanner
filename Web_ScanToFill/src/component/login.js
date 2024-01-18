import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginForm = () => {
  const navigate = useNavigate();

  const [showSignUp, setShowSignUp] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false); // New state for the checkbox

  const handleSignUpClick = () => {
    setShowSignUp(!showSignUp);
  };

  const handlePrivacyChange = () => {
    setPrivacyChecked(!privacyChecked);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (email === 'yahyaelaaaatar@gmail.com' && password === '123456') {
      navigate('/main');
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <section>
        <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span>  <span></span> <span></span> <span></span> 
        <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
        <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
         <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
          <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
          <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
          <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
          <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
           <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
           <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
           <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
           <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
           <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
           <span></span> <span></span> 
           <div className="signin">
        <div className="content">
          <h2>{showSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <form className="form" onSubmit={handleLogin}>
            <div className="inputBox">
              <input type="text" required />
              <i>{showSignUp ? 'Email' : 'Email'}</i>
            </div>
            <div className="inputBox">
              <input type={showSignUp ? 'password' : 'password'} required />
              <i>Password</i>
            </div>
            {showSignUp && (
              <div className="inputBox">
                <input type="password" required />
                <i>Confirm Password </i>
              </div>
            )}
            {showSignUp && (
              <div className="privacy-form">
                <label htmlFor="privacy-checkbox">
                  <input
                    type="checkbox"
                    id="privacy-checkbox"
                    checked={privacyChecked}
                    onChange={handlePrivacyChange}
                    required
                  />
                   I accept the terms of the general privacy policy  
                </label>
              </div>
            )}
            <div className="links">
              <a href="#">Forgot Password ?</a>
              <a href="#" onClick={handleSignUpClick}>
                {showSignUp ? 'Sign In' : 'Sign Up'}
              </a>
            </div>
            <div className="inputBox">
              <input
                className="btn"
                type="submit"
                value={showSignUp ? 'Sign Up' : 'Login'}
                disabled={showSignUp && !privacyChecked} // Disable if signing up and privacy not accepted
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;