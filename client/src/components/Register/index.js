import { Button, Grid, Header, Form, Checkbox } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

function Register(props) {
  const [currentName, setName] = useState("");
  const [currentPassword, setPassword] = useState("");
  const [currentPasswordConfirm, setPasswordConfirm] = useState("");
  const [checkBoxValue, setCheckBoxValue] = useState(0);

  const registerSubmit = () => {
    const register = {
      username: currentName,
      password: currentPassword,
      passwordconfirm: currentPasswordConfirm,
      profession: checkBoxValue
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
  const handleCheckBoxTick = (event, {value}) => {
    console.log("set check box")
    setCheckBoxValue(value)
  };

  if (props.tab !== "/register") {
    return <Redirect to={props.tab} />;
  }
  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2"> Register</Header>
      <Form size="large">
        <Checkbox radio
        name="checkBoxRadioGroup"
        value={1}
        label="I'm an optician"
        checked={checkBoxValue === 1}
        onChange={handleCheckBoxTick}
        />
        <Checkbox radio
        name="checkBoxRadioGroup"
        value={2}
        label="I'm an opthalmologist"
        checked={checkBoxValue === 2}
        onChange={handleCheckBoxTick}
        />
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
