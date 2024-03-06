import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState({ content: '', type: '' }); // Consolidated message state
  const { setIsLoggedIn } = useContext(AuthContext);
  // Initialize useHistory hook for navigation
  const history = useHistory();

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setMessage({ content: '', type: '' }); // Clear any existing messages

    fetch(`${backendUrl}/login`, { // Make a request to the login endpoint in Flask API
      method: 'POST',
      credentials: 'include', //*******code to include cookies********
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) { // Assuming your API returns a 'success' field
          setIsLoggedIn(true); // Set the logged-in state
          setMessage({ content: 'Login Successful. Redirecting...', type: 'success' });
          setTimeout(() => {
            history.push('/profile'); // Redirect to the home page or another page
          }, 2000); // Delay for 2 seconds before redirecting
        } else { // Handle login failure (e.g., show an error message)
          console.error('Login failed:', data.message); // Assuming your API returns a 'message' field
          setMessage({ content: 'Login failed. Please check your email and password then try again.', type: 'error' });
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        setMessage({ content: 'An error occurred during login.', type: 'error' });
      });
  };

  // Function to navigate to the signup route
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
