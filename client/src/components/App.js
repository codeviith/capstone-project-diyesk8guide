import React, { useEffect } from 'react';
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";
import Generate from './Generate';
import Header from './Header';
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import About from "./About";
import Guru from './Guru';
import Home from "./Home";
import Qna from './Qna';


//remember to set proxy for the backend server!!

// backend_route = ""

function App() {
  // const [user, setUser] = useState  ({});
  // const [currentUser, setCurrentUser] = useState({});

/*

  useEffect(() => {
    fetch("/check_session")
    .then((data) => {
      if (data.ok) {
        data.json().then((user) => setCurrentUser(user));
      }
    })
  }, [])

*/

  return (
    <div className="app">
      <Header />
      <main>
        <NavBar/>
        <Switch>
            <Route exact path="/">
              <About />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/generate">
              <Generate />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/game">
              {/* <Game /> */}
            </Route>
            <Route path="/guru">
              <Guru />
            </Route>
            <Route path="/qna">
              <Qna />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
