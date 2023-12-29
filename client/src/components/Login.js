import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const { setIsLoggedIn } = useContext(AuthContext);
  // Initialize useHistory hook for navigation
  const history = useHistory();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Make a request to the login endpoint in your Flask API
    fetch('/login', {
      method: 'POST',
      credentials: 'include', //code to include cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) { // Assuming your API returns a 'success' field
        setIsLoggedIn(true); // Set the logged-in state
        history.push('/home'); // Redirect to the home page or another page
      } else {
        // Handle login failure (e.g., show an error message)
        console.error('Login failed:', data.message); // Assuming your API returns a 'message' field
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      // Handle network errors or other exceptions
    });
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