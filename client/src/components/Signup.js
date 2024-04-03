import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';

function Signup() {
  const history = useHistory();
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    riderStance: '',
    boardsOwned: [],
  });
  const [message, setMessage] = useState({ content: '', type: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false
  });

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'password' || name === 'confirmPassword') {
      const updatedPassword = name === 'password' ? value : signupData.password;
      const updatedConfirmPassword = name === 'confirmPassword' ? value : signupData.confirmPassword;

      setPasswordCriteria({
        hasUppercase: /[A-Z]/.test(updatedPassword),
        hasLowercase: /[a-z]/.test(updatedPassword),
        hasNumber: /[0-9]/.test(updatedPassword),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(updatedPassword),
        isLongEnough: updatedPassword.length >= 6,
        passwordsMatch: updatedPassword === updatedConfirmPassword
      });
    }

    setSignupData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? [...prevData[name], value] : prevData[name].filter(board => board !== value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      setMessage({ content: 'Passwords do not match.', type: 'error' });
      return;
    }

    if (!passwordRegex.test(signupData.password)) {
      setMessage({ content: 'Password must contain at least: one uppercase letter, one lowercase letter, one number, one special character, and 6 characters.', type: 'error' });
      return;
    }

    fetch(`${backendUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
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
    'Meepo', "_DIY_", "Other"
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

        <div className="input-container">
          <label>Password:
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={signupData.password}
              onChange={handleInputChange}
              required
            />
            <button className="password-visibility-toggle"
              type="button"
              onMouseDown={togglePasswordVisibility}
              onMouseUp={togglePasswordVisibility}
              onTouchStart={togglePasswordVisibility}
              onTouchEnd={togglePasswordVisibility}>
              👁️
            </button>
            <span className='password-criteria'>Have at least:
              <span style={{ color: passwordCriteria.hasUppercase ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasUppercase ? 'bold' : 'normal' }}>
                one uppercase letter,
              </span>
              <span style={{ color: passwordCriteria.hasLowercase ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasLowercase ? 'bold' : 'normal' }}>
                one lowercase letter,
              </span>
              <span style={{ color: passwordCriteria.hasNumber ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasNumber ? 'bold' : 'normal' }}>
                one number,
              </span>
              <span style={{ color: passwordCriteria.hasSpecialChar ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasSpecialChar ? 'bold' : 'normal' }}>
                one special character,
              </span>
              <span style={{ color: passwordCriteria.isLongEnough ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.isLongEnough ? 'bold' : 'normal' }}>
                6 characters
              </span>
            </span>
          </label>
        </div>
        <br />

        <div className="input-container">
          <label>Confirm Password:
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button className="password-visibility-toggle"
              type="button"
              onMouseDown={toggleConfirmPasswordVisibility}
              onMouseUp={toggleConfirmPasswordVisibility}
              onTouchStart={toggleConfirmPasswordVisibility}
              onTouchEnd={toggleConfirmPasswordVisibility}>
              👁️
            </button>
            <span className='password-criteria'>
              <span style={{ color: passwordCriteria.passwordsMatch ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.passwordsMatch ? 'bold' : 'normal' }}>
                passwords match
              </span>
            </span>
          </label>
        </div>
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
          <select className='ride_stance_select'
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

        <button className='submit-button'
          type="submit">Create Account
        </button>
      </form>
      <div className="footer-bottom-signup">
        <NavLink className="footer-bottom-link-signup" to="/about">About</NavLink>
        <NavLink className="footer-bottom-link-signup" to="/contact-us">Contact Us</NavLink>
        <NavLink className="footer-bottom-link-signup" to="/donations">Donations</NavLink>
        <NavLink className="footer-bottom-link-signup" to="/disclaimers">Disclaimers</NavLink>
        <NavLink className="footer-bottom-link-signup" to="/rules-and-policies">Rules & Policies</NavLink>
      </div>
    </div>
  );
};

export default Signup;

