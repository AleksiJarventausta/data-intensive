import { Button, Grid, Header, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

function Register(props) {
  const [currentName, setName] = useState("");
  const [currentPassword, setPassword] = useState("");
  const [currentPasswordConfirm, setPasswordConfirm] = useState("");

  const registerSubmit = () => {
    const register = {
      username: currentName,
      password: currentPassword,
      passwordconfirm: currentPasswordConfirm
    };
    let authorization = ""
    if (localStorage.jwtTokenTeams) {
      // Set auth token header auth
      authorization = localStorage.jwtTokenTeams
    }
    fetch("/user/register", {
      method: "post",
      body: JSON.stringify(register),
      headers: { "Content-Type": "application/json", "Authorization": authorization }
    })
      .then((res) => {
        if (res.status) {
          console.log(res.status);
          props.onRegister();
        } else {
          console.log("registration failed");
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

  const handleVerifyChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  if (props.tab !== "/register") {
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
        <Form.Input
          icon="lock"
          iconPosition="left"
          placeholder="Verify Password"
          type="password"
          onChange={handleVerifyChange}
        />
        <Button onClick={registerSubmit}> Register </Button>
      </Form>
    </Grid.Column>
  );
}

export default Register;
