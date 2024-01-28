import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup() {
  const history = useHistory();
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    riderStance: '',
    boardsOwned: [],
  });
  const [message, setMessage] = useState({ content: '', type: '' });
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false
  });


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'password') {
      setPasswordCriteria({
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        isLongEnough: value.length >= 8
      });
    }

    setSignupData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? [...prevData[name], value] : prevData[name].filter(board => board !== value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordRegex.test(signupData.password)) {
      setMessage({ content: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.', type: 'error' });
      return;
    }

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
          setMessage({ content: 'Account created successfully. Redirecting to login...', type: 'success' });

          setTimeout(() => {
            history.push('/login');
          }, 2000);
        } else if (data.message === 'Email already in use') {
          setMessage({ content: 'Email already in use. Please use a different email.', type: 'error' });
        }
      })
      .catch(error => {
        console.error('Error during signup:', error);
        setMessage({ content: 'An error occurred during signup.', type: 'error' });
      });
  };

  const boardsOptions = [
    'Evolve', 'Lacroix', 'KalyNYC', 'Metroboard',
    'Trampa', 'Mellow', 'Boosted', 'Exway',
    'Bajaboard', 'Hoyt St.', 'Acton', 'Backfire',
    'Meepo'
  ];


  return (
    <div className='signup'>
      <h2>Create an Account</h2>
      {message.content && (
        <p className={message.type === 'success' ? "success-message" : "error-message"}>
          {message.content}
        </p>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit}>
        <label>Email (This is what you will use to log in):
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
          <span className='password-criteria'>Have at least one:
            <span style={{ color: passwordCriteria.hasUppercase ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasUppercase ? 'bold' : 'normal' }}> uppercase letter, </span>
            <span style={{ color: passwordCriteria.hasLowercase ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasLowercase ? 'bold' : 'normal' }}>lowercase letter, </span>
            <span style={{ color: passwordCriteria.hasNumber ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasNumber ? 'bold' : 'normal' }}>number, </span>
            <span style={{ color: passwordCriteria.hasSpecialChar ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasSpecialChar ? 'bold' : 'normal' }}>special character, </span>
            <span style={{ color: passwordCriteria.isLongEnough ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.isLongEnough ? 'bold' : 'normal' }}>8 characters </span>
          </span>
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
            <option value="Both">Both</option>
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



