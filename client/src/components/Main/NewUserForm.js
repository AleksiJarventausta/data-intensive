import { Button, Grid, Header, Form} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

function NewUserForm(props) {


  return (
    <Form>
    <Form.Field>
        <label>First name</label>
        <input placeholder='First name' />
    </Form.Field>
    <Form.Field>
        <label>Last name</label>
        <input placeholder='Last name' />
    </Form.Field>
    <Form.Field>
        <label>Adress</label>
        <input placeholder='Address' />
    </Form.Field>
    <Form.Field>
        <label>Social security number</label>
        <input placeholder='Social security number' />
    </Form.Field>
    </Form>
  );
}
export default NewUserForm;