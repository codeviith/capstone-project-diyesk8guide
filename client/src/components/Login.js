import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState({ content: '', type: '' });
  const { setIsLoggedIn } = useContext(AuthContext);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';

  // Code to initialize useHistory hook for navigation
  const history = useHistory();


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setMessage({ content: '', type: '' });

    fetch(`${backendUrl}/login`, {
      method: 'POST',
      credentials: 'include', //*******code to include cookies********
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://diyesk8guide-frontend.onrender.com'
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

  return (
    <div className='login'>
      <h2>Please Sign In to Continue...</h2>

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
          <input
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
        </label>
        <br />
        <label>Password:
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>


      <h4> New Builders </h4>
      <button onClick={handleCreateAccount}>Sign Up</button>
    </div>
  );
};

export default Login;


