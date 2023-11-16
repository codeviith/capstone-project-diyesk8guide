import React, { useEffect } from 'react';
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";
import Generate from './Generate';
import Header from './Header';
import NavBar from "./NavBar";
import Login from "./Login";
import About from "./About";
import Home from "./Home";


//remember to set proxy for the backend server!!


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
    <BrowserRouter>
      <Header />
      <main>
        <NavBar/>
        <Switch>
            <Route path="/">
                <Home 
                // setUser={setUser}
                // user = {user}
                />
            </Route>
            <Route path="/home">
              <About />

            </Route>
            <Route path="/ ___ ">

            </Route>
        </Switch>
      </main>
    </BrowserRouter>
    </div>
  );
}

export default App;
