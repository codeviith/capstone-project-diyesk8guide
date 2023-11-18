import React, { useState } from 'react';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    riderStance: '',
    boardsOwned: [],
  });

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
        // Handle signup success or failure
        console.log('Signup response:', data);
      })
      .catch(error => console.error('Error during signup:', error));
  };

  const boardsOptions = [
    'Evolve', 'Lacroix', 'Kaly NYC', 'Metroboard',
    'Trampa', 'Mellow', 'Boosted', 'Exway',
    'Bajaboard', 'Hoyt St.', 'Acton', 'Backfire',
  ];

  return (
    <div>
      <h2>Create an Account</h2>

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
          <div>
            {boardsOptions.map(board => (
              <label key={board}>
                <input
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

        <button type="submit">Create an Account</button>
      </form>
    </div>
  );
};

export default Signup;





















//     {/* Signup Form */}
//     <form onSubmit={handleSignupSubmit}>
//     <h3>Sign Up</h3>
//     <label>First Name:
//       <input
//         type="text"
//         value={signupData.firstName}
//         onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
//       />
//     </label>
//     <br />
//     <label>Last Name:
//       <input
//         type="text"
//         value={signupData.lastName}
//         onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
//       />
//     </label>
//     <br />
//     <label>Email:
//       <input
//         type="email"
//         value={signupData.email}
//         onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//       />
//     </label>
//     <br />
//     <label>Rider Style:
//       <input
//         type="text"
//         value={signupData.riderStyle}
//         onChange={(e) => setSignupData({ ...signupData, riderStyle: e.target.value })}
//       />
//     </label>
//     <br />
//     <button type="submit">Sign Up</button>
//   </form>