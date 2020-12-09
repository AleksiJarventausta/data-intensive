import { Button, Grid, Header} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

function Main(props) {

  const handleLogout = () => {
      props.onLogout("nouser", "/")
    }

  if (props.tab !== "/main") {
    return <Redirect to={props.tab}/>
  }

  return (
    <Grid.Column style={{maxWidth:450}}>
      <Header as='h2'> Welcome, {props.user} </Header>
      <Button onClick={handleLogout}> Logout Button </Button>
    </Grid.Column>

  );
}

export default Main;
