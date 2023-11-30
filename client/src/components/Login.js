import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Initialize useHistory hook for navigation
  const history = useHistory();

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    riderStyle: '',
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Make a request to the login endpoint in your Flask API
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle login success or failure
        console.log('Login response:', data);
      })
      .catch(error => console.error('Error during login:', error));
  };


  // Function to navigate to the signup route
  const handleCreateAccount = () => {
    history.push('/signup');
  };

  return (
    <div className='login'>
      <h2>Sign in to continue</h2>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit}>
        <h3>Returning Builders</h3>
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
        <button onClick={handleCreateAccount}>Sign up</button>
    </div>
  );
};

export default Login;