import { Button, Grid, Header, Form} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import fetch from "node-fetch";

function Login(props) {
  const [currentName, setName] = useState("");
  const [currentPassword, setPassword] = useState("");



  const loginSubmit = () => {
    const login = {
      username: currentName,
      password: currentPassword
    }
    //console.log("POST: {" + login.username + ", " + login.password + "}")
    fetch('http://localhost:8080/user/login', {
            method: 'post',
            body: JSON.stringify(login),
            headers: { 'Content-Type': 'application/json'},
          })
          .then(res => {
            if (res.ok) {
              props.onLogin(currentName, "/main")
            } else {
              return;
            }
          });
        }
  const handleNameChange = event => {
    setName(event.target.value)
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }
  if (props.tab !== "/") {
    return <Redirect to={props.tab}/>
  }
  return (
    <Grid.Column style={{maxWidth:450}}>
      <Header as='h2'> Login </Header>
      <Form size='large'>
        <Form.Input icon='user' iconPosition='left' placeholder='Account Name' onChange={handleNameChange} />
        <Form.Input icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={handlePasswordChange} />
        <Button onClick={loginSubmit} > Login Button </Button>
      </Form>
    </Grid.Column>

  );
}

export default Login;
