import { Button, Grid, Header, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

function Login(props) {
  const [currentName, setName] = useState("");
  const [currentPassword, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.jwtTokenTeams) {
      // Set auth token header auth
      const token = JSON.parse(localStorage.jwtTokenTeams);
      setAuthToken(token);

      // Decode token and get user info and exp
      const decoded = jwt_decode(token);

      // Check for expired token
      const currentTime = Date.now() / 1000; 
      props.onLogin(decoded, "/main");
      if (decoded.exp < currentTime) {
        // Logout user
      }
    }
  }, []);

  const loginSubmit = () => {
    const login = {
      username: currentName,
      password: currentPassword,
    };
    fetch("/user/login", {
      method: "post",
      body: JSON.stringify(login),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          const  token = res.token;
          localStorage.setItem("jwtTokenTeams", JSON.stringify(token));
          // Set token to Auth header
          setAuthToken(token);
          // Decode token to get user data
          const decoded = jwt_decode(token);
          props.onLogin(decoded, "/main");
        } else {
          return;
        }
      });
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  if (props.tab !== "/") {
    return <Redirect to={props.tab} />;
  }
  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2"> Login </Header>
      <Form size="large">
        <Form.Input
          icon="user"
          iconPosition="left"
          placeholder="Account Name"
          onChange={handleNameChange}
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          onChange={handlePasswordChange}
        />
        <Button onClick={loginSubmit}> Login Button </Button>
      </Form>
    </Grid.Column>
  );
}

export default Login;
