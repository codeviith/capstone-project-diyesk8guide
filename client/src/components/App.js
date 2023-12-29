import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Generate from './Generate';
import NavBar from "./NavBar";
import Login from "./Login";
import Logout from './Logout';
import Signup from "./Signup";
import Guru from './Guru';
import Home from "./Home";
import Qna from './Qna';
import Guide from './Guide';
import Account from './Account';
import About from "./About";
import ContactUs from './ContactUs';


function App() {
  return (
    <div className="app">
      <AuthProvider>
        <main>
          <NavBar/>
          <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/guide">
                <Guide />
              </Route>
              <Route path="/generate">
                <Generate />
              </Route>
              <Route path="/guru">
                <Guru />
              </Route>
              <Route path="/qna">
                <Qna />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/account">
                <Account />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/contactus">
                <ContactUs />
              </Route>
          </Switch>
        </main>
      </AuthProvider>
    </div>
  );
}

export default App;

