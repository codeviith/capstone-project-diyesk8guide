import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    riderStance: '',
    boardsOwned: [],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    setSignupData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? [...prevData[name], value] : prevData[name].filter(board => board !== value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a request to the signup endpoint in your Flask API
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Account created successfully') {
        // Handle successful signup
        setSuccessMessage('Account created successfully. Redirecting to login...');
        setErrorMessage('');

        // Set a timeout for 2 seconds before redirecting
        setTimeout(() => {
          history.push('/login'); // Replace '/login' with your login route
        }, 2000);
      } else if (data.message === 'Email already in use') {
        // Handle the "email already in use" case
        setErrorMessage('Email already in use. Please use a different email.');
        setSuccessMessage('');
      }
    })
    .catch(error => {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred during signup.');
    });
  };

  const boardsOptions = [
    'Evolve', 'Lacroix', 'KalyNYC', 'Metroboard',
    'Trampa', 'Mellow', 'Boosted', 'Exway',
    'Bajaboard', 'Hoyt St.', 'Acton', 'Backfire',
  ];

  return (
    <div className='signup'>
      <h2>Create an Account</h2>
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

      {/* Signup Form */}
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>Password:
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>First Name:
          <input
            type="text"
            name="firstName"
            value={signupData.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>Last Name:
          <input
            type="text"
            name="lastName"
            value={signupData.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>Rider Stance:
          <select
            name="riderStance"
            value={signupData.riderStance}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Rider Stance</option>
            <option value="Regular">Regular</option>
            <option value="Goofy">Goofy</option>
          </select>
        </label>
        <br />

        <label>Boards Owned:
          <div className="checkbox-container">
            {boardsOptions.map(board => (
              <label key={board}>
                <input className='checkbox'
                  type="checkbox"
                  name="boardsOwned"
                  value={board}
                  checked={signupData.boardsOwned.includes(board)}
                  onChange={handleInputChange}
                />
                {board}
              </label>
            ))}
          </div>
        </label>
        <br />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;

