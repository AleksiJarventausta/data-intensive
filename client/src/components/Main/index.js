import { Button, Grid, Header, Form} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import NewForm from './NewUserForm';
import CustomerList from './customerList';
import CornerStoneViewPort from './CornerstoneViewport';

function Main(props) {



  const handleLogout = () => {
      props.onLogout({}, "/")
    }

  if (props.tab !== "/main") {
    return <Redirect to={props.tab}/>
  }

  return (
    <Grid.Column style={{maxWidth:450}}>
      <Header as='h2'> Welcome, {props.user.username} </Header>
      <Button onClick={handleLogout}> Logout Button </Button>
      <NewForm></NewForm>
      <CustomerList></CustomerList>
      <CornerStoneViewPort></CornerStoneViewPort>


    </Grid.Column>
    

  );
}

export default Main;
