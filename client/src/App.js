import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Login from "./components/Login";
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
      }
    }
  }, []);

  const handleLogin = (user, tab) => {
    setUser(user);
    setTab(tab);
  };
  return (
    <Router>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: "100vh" }}
      >
        <Switch>
          <Route exact path="/">
            <Login onLogin={handleLogin} tab={tab} />
          </Route>
          <Route path="/main">
            <Main user={user} onLogout={handleLogin} tab={tab} />
          </Route>
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;
