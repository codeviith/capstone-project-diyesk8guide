import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Generate from './Generate';
import NavBar from "./NavBar";
import Login from "./Login";
import Logout from './Logout';
import Signup from "./Signup";
import Guru from './Guru';
import Home from "./Home";
// import Qna from './Qna';
import Gallery from './Gallery';
import Guide from './Guide';
import Profile from './Profile';
import About from "./About";
import ContactUs from './ContactUs';
import Donations from './Donations';
import Disclaimers from './Disclaimers';
import RulesAndPolicies from './RulesAndPolicies';
// import Footer from './Footer';


function App() {
  // const location = useLocation();

  // Function to determine if the footer should be displayed
  // const shouldDisplayFooter = () => {
  //   const path = location.pathname;
  //   return path !== '/login' && path !== '/signup';
  // };

  return (
    <div id="root">
      <AuthProvider>
        <main>
          <NavBar />
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
            {/* <Route path="/qna">
              <Qna />
            </Route> */}
            <Route path="/gallery">
              <Gallery />
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
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contactus">
              <ContactUs />
            </Route>
            <Route path="/donations">
              <Donations />
            </Route>
            <Route path="/disclaimers">
              <Disclaimers />
            </Route>
            <Route path="/rulesandpolicies">
              <RulesAndPolicies />
            </Route>
          </Switch>
          {/* {shouldDisplayFooter() && <Footer />} */}
        </main>
      </AuthProvider>
    </div>
  );
}

export default App;

