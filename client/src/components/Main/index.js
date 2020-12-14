import { Container, Grid, Header, List, Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import NewForm from "./NewUserForm";
import CustomerList from "./customerList";
import CornerStoneViewPort from "./CornerstoneViewport";
import CustomMenu from "./Menu";

function Main(props) {
  const handleLogout = () => {
    props.onLogout({}, "/");
  };

  if (props.tab !== "/main") {
    return <Redirect to={props.tab} />;
  }

  return (
    <>
      <div>
        <CustomMenu />
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h2"> Welcome, {props.user.username} </Header>
          <Button onClick={handleLogout}> Logout Button </Button>
        </Container>

        <Grid columns={2} relaxed="very">
          <Grid.Row>
            <Grid.Column width={8}>
              <NewForm></NewForm>
            </Grid.Column>
            <Grid.Column width={8}>
              <CustomerList></CustomerList>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <CornerStoneViewPort imageIds={["wadouri:" + window.location.origin + "/image/lolxs"]}></CornerStoneViewPort>
            </Grid.Column>
            <Grid.Column width={8}>
              <h1>Lisää </h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default Main;
