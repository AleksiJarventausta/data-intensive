import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";


function App() {
  const [user, setUser] = useState({});
  const [tab, setTab] = useState("/");

  useEffect(() => {
    if (localStorage.jwtTokenTeams) {
      // Set auth token header auth
      const token = JSON.parse(localStorage.jwtTokenTeams);
      setAuthToken(token);

      // Decode token and get user info and exp
      const decoded = jwt_decode(token);

      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        handleLogout()

      }
    }
  }, []);

  const handleLogin = (user, tab) => {
    setUser(user);
    setTab(tab)
  };

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("jwtTokenTeams")
    setTab("/");
  }

  const handleRegister = () => {
    setTab("/");
  }
  const handleRegisterView = () => {
    setTab("/register");
  }
  return (
    <Router>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: "100vh" }}
      >
        <Switch>
          <Route exact path="/">
            <Login onLogin={handleLogin} onRegisterView={handleRegisterView} tab={tab} />
          </Route>
          <Route exact path="/register">
            <Register onRegister={handleRegister} tab={tab} />
          </Route>
          <Route path="/main">
            <Main user={user} onLogout={handleLogout} tab={tab} />
          </Route>
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;
