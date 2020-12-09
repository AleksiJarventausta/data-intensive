import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import Login from './components/Login';
import Main from './components/Main';

function App() {
  const [user, setUser] = useState("User")
  const [tab, setTab] = useState("/")

  const handleLogin = (user, tab) => {
    setUser(user)
    setTab(tab)
  }
  return (
    <Router>
      <Grid textAlign='center' verticalAlign='middle' style={{ height:'100vh'}}>
        <Switch>
          <Route exact path="/">
            <Login onLogin={handleLogin} tab={tab} />
          </Route>
          <Route path="/main">
            <Main user={user} onLogout={handleLogin} tab={tab}/>
          </Route>
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;
