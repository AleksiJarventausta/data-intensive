import { Button, Grid, Header, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function NewUserForm(props) {
  const [currentFirstName, setName] = useState("");
  const [currentLastName, setLastName] = useState("");
  const [currentAddress, setAddress] = useState("");
  const [currentSSN, setSSN] = useState("");

  const handleSubmit = () => {
    const newUser = {
      firstname: currentFirstName,
      lastname: currentLastName,
      address: currentAddress,
      ssn: currentSSN,
    };
    axios.post("customer/newuser", newUser).then((res) => {
      console.log(res);
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleSSNChange = (event) => {
    setSSN(event.target.value);
  };

  return (
    <Form>
      <Form.Field>
        <label>First name</label>
        <input placeholder="First name" onChange={handleNameChange} />
      </Form.Field>
      <Form.Field>
        <label>Last name</label>
        <input placeholder="Last name" onChange={handleLastNameChange} />
      </Form.Field>
      <Form.Field>
        <label>Adress</label>
        <input placeholder="Address" onChange={handleAddressChange} />
      </Form.Field>
      <Form.Field>
        <label>Social security number</label>
        <input
          placeholder="Social security number"
          onChange={handleSSNChange}
        />
      </Form.Field>
      <Button onClick={handleSubmit}> Add new user </Button>
    </Form>
  );
}
export default NewUserForm;
