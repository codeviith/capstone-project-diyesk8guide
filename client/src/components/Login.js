import React, { useState, useContext, useEffect } from 'react';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState({ content: '', type: '' });
  const [errors, setErrors] = useState({});
  const { setIsLoggedIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';

  // Code to initialize useHistory hook for navigation
  const history = useHistory();
  const location = useLocation();  // code to access the navigation state

  useEffect(() => {
    if (location.state?.loggedOutDueToInactivity) {
      setShowModal(true);
      setMessage({
        content: 'You have been logged out due to inactivity.',
        type: 'info'
      })
    }
  }, [location])

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setMessage({ content: '', type: '' });

    if (!validateForm()) {  // Code to validate the form before attempting to log in.
      return;  //  The empty return here is to stop the submission if the validation fails.
    }

    fetch(`${backendUrl}/login`, {
      method: 'POST',
      credentials: 'include', //*******code to include cookies********
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsLoggedIn(true);
          setMessage({ content: 'Login Successful. Redirecting...', type: 'success' });
          setTimeout(() => {
            history.push('/profile');
          }, 2000);
        } else {
          console.error('Login failed:', data.message);
          setMessage({ content: 'Login failed. Please check your email and password then try again.', type: 'error' });
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        setMessage({ content: 'An error occurred during login.', type: 'error' });
      });
  };

  const handleCreateAccount = () => {
    history.push('/signup');
  };

  const validateForm = () => {
    let valErrors = { email: '', password: '' };
    let isValid = true;

    if (!loginData.email) {
      valErrors.email = 'Email cannot be empty.';
      isValid = false;
    }

    if (!loginData.password) {
      valErrors.password = 'Password cannot be empty';
      isValid = false;
    }

    setErrors(valErrors);
    return isValid;
  };

  const handleMouseDownPassword = () => {
    setShowPassword(true);
  }

  const handleMouseUpPassword = () => {
    setShowPassword(false);
  }


  return (
    <div className='login'>
      <h2>Please Sign In to Continue...</h2>
      {showModal && (
        <div className="modal-backdrop">
          <div className="session-expiry-modal-container">
            <p className="session-expiry-text">{message.content}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit}>
        <h3>Returning Builders</h3>
        {/* Display message */}
        {message.content && (
          <div className={`login-message ${message.type === 'success' ? 'success-message' : 'error-message'}`}>
            {message.content}
          </div>
        )}
        <label>Email:
          <input className='email-input-box'
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
        </label>
        {errors.email && <div className='error-message'>{errors.email}</div>}
        <br />
        <label>Password:
          <div className='password-input-box'>
            <input
              type={showPassword ? "text" : "password"} // Code to toggle between text and password, text displays the password, password displays * symbol
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            {/* Toggle Password Visibility Button */}
            <button className='login-password-toggle-button'
              type="button"
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              onMouseLeave={handleMouseUpPassword}  // Code for extra security to make sure password remains hidden
              onTouchStart={handleMouseDownPassword}  // code for mobile devices
              onTouchEnd={handleMouseUpPassword}  // code for mobile devices
            >👁️
            </button>
          </div>
        </label>
        {errors.password && <div className='error-message'>{errors.password}</div>}
        <br />
        <button className='login-button'
          type="submit"
        >Login
        </button>
      </form>

      <h4> New Builders </h4>
      <button className='signup-button'
        onClick={handleCreateAccount}
      >Sign Up
      </button>
      <div className="footer-bottom-login">
        <NavLink className="footer-bottom-link-login" to="/about">About</NavLink>
        <NavLink className="footer-bottom-link-login" to="/contact-us">Contact Us</NavLink>
        <NavLink className="footer-bottom-link-login" to="/donations">Donations</NavLink>
        <NavLink className="footer-bottom-link-login" to="/disclaimers">Disclaimers</NavLink>
        <NavLink className="footer-bottom-link-login" to="/rules-and-policies">Rules & Policies</NavLink>
      </div>
    </div>
  );
};

export default Login;
