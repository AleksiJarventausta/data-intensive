import { Container, Grid, Header, List, Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import NewForm from "./NewUserForm";
import CustomerList from "./customerList";
import CornerStoneViewPort from "./CornerstoneViewport";
import CustomMenu from "./CustomMenu";

function Main(props) {
  const [customerId, setCustomerId] = useState("");
  const handleLogout = () => {
    props.onLogout({}, "/");
  };

  if (props.tab !== "/main") {
    return <Redirect to={props.tab} />;
  }

  const isOptician = () => {
    return props.user.profession === 1 ? true : false;
  };
  const isOpth = () => {
    return props.user.profession === 2 ? true : false;
  };

  return (
    <Grid container columns={2} relaxed="very">
      <CustomMenu username={props.user.username} onLogout={handleLogout} />
      <Grid.Row> </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <CustomerList user={props} setCustomerId={setCustomerId} />
        </Grid.Column>
        <Grid.Column>
          {customerId.length > 0 && isOpth() ? (
            <CornerStoneViewPort customerId={customerId} />
          ) : (
            <div></div>
          )}
          {isOptician() ? (
            <Grid.Column width={8}>
              <NewForm />
            </Grid.Column>
          ) : (
            <div></div>
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}></Grid.Column>
        <Grid.Column width={8}></Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Main;
