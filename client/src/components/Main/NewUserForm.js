import { Button, Form, Label, Icon } from "semantic-ui-react";
import Dropzone from "react-dropzone";
import { useState } from "react";
import axios from "axios";

function NewUserForm(props) {
  const [currentFirstName, setName] = useState("");
  const [currentLastName, setLastName] = useState("");
  const [currentAddress, setAddress] = useState("");
  const [currentSSN, setSSN] = useState("");
  const [currentFiles, setFile] = useState([]);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('firstname', currentFirstName);
    formData.append('lastname', currentLastName);
    formData.append('address', currentAddress);
    formData.append('SSN', currentSSN);
    formData.append('image', currentFiles[0]);

    fetch('/customer/newcustomerwithimage', {
      method: 'PUT',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      console.log('User data sent', res);
    })
    .catch(error => {
      console.error('Error snding uesr data', error);
    });

    /*
    const customer = {
      firstname: currentFirstName,
      lastname: currentLastName,
      address: currentAddress,
      ssn: currentSSN,
    };
    axios
      .post("http://localhost:8080/customer/newcustomer", customer)
      .then((res) => {
        console.log(res);
      });
    */
  };

  const handleFileInput = (acceptedFiles) => {
    setFile(acceptedFiles);
    console.log("File input");
  }
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
      <Dropzone onDrop={handleFileInput}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Label as='a'>
              <Icon name='file' />
              Drag and Drop or Insert files here
              </Label>
            </div>
          </section>
        )}
      </Dropzone>
      <Button onClick={handleSubmit}> Add new user </Button>
    </Form>
  );
}
export default NewUserForm;
