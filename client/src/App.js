import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Button, Grid, Header} from 'semantic-ui-react';

function App() {
  return (
    <Router>
      <Grid textAlign='center' verticalAlign='middle' style={{ height:'100vh'}}>
        <Switch>
          <Route exact path="/">
            <Grid.Column style={{maxWidth:450}}>
              <Header as='h2'>  aaa </Header>
                <Button as={Link} to="/main"> Login Button</Button>
            </Grid.Column>
          </Route>
            <Route path="/main">
              <Grid.Column style={{maxWidth:450}}>
                <Header as='h2'>  eee </Header>
                  <Button as={Link} to="/"> Log Out Button</Button>
              </Grid.Column>
            </Route>
          </Switch>
      </Grid>
    </Router>
  );
}

export default App;
