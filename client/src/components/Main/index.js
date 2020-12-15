import { Container, Grid, Header, List, Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import {useState} from "react";
import NewForm from "./NewUserForm";
import CustomerList from "./customerList";
import CornerStoneViewPort from "./CornerstoneViewport";
import CustomMenu from "./CustomMenu";


function Main(props) {
  const [customerId, setCustomerId] = useState("5fd5ffc5d621e849cc427a00");
  const handleLogout = () => {
    props.onLogout({}, "/");
  };

  if (props.tab !== "/main") {
    return <Redirect to={props.tab} />;
  }

  return (


      <Grid container columns={2} relaxed="very">
        <CustomMenu username={props.user.username} onLogout={handleLogout}/>
        <Grid.Row>

        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <NewForm />
          </Grid.Column>
          <Grid.Column width={8}>
            <CustomerList setCustomerId={setCustomerId} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <CornerStoneViewPort customerId={customerId} />
          </Grid.Column>
          <Grid.Column width={8}>
            <h1>Lisää </h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>


  );
}

export default Main;
