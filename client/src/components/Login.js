// import React, { useState } from "react";


// function Login({setUser, user}) {
//     const [loginEmail, setLoginEmail] = useState("");
//     const [loginPwd, setLoginPass] = useState("");
//     const [newEmail, setNewEmail] = useState("");
//     const [newPwd, setNewPass] = useState("");

//     function handleLogin(e) {
//         e.preventDefault();

//         const data = {
//             email: loginEmail,
//             passowrd: loginPwd
//         };

//         // fetch(""), {}
//     }

//     return (
//         <div>
//             Test
//         </div>
//     )
// }

// export default Login









// import React, { useState } from 'react';

// const Login = () => {
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: '',
//   });

//   const [signupData, setSignupData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     riderStyle: '',
//   });

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     // Make a request to the login endpoint in your Flask API
//     fetch('/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(loginData),
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Handle login success or failure
//         console.log('Login response:', data);
//       })
//       .catch(error => console.error('Error during login:', error));
//   };

//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
//     // Make a request to the signup endpoint in your Flask API
//     fetch('/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(signupData),
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Handle signup success or failure
//         console.log('Signup response:', data);
//       })
//       .catch(error => console.error('Error during signup:', error));
//   };

//   return (
//     <div>
//       <h2>Sign in to continue</h2>

//       {/* Login Form */}
//       <form onSubmit={handleLoginSubmit}>
//         <h3>Login</h3>
//         <label>Email:
//           <input
//             type="email"
//             value={loginData.email}
//             onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//           />
//         </label>
//         <br />
//         <label>Password:
//           <input
//             type="password"
//             value={loginData.password}
//             onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//           />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;









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

  const handleSignupSubmit = (e) => {
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

  // Function to navigate to the signup route
  const handleCreateAccount = () => {
    history.push('/signup');
  };

  return (
    <div>
      <h2>Sign in to continue</h2>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit}>
        <h3>Login</h3>
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
      <h4> Sign Up </h4>
        {/* Create an Account Button */}
        <button onClick={handleCreateAccount}>Create an Account</button>
    </div>
  );
};

export default Login;