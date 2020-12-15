import { Button} from "semantic-ui-react";
import { useState, useEffect } from "react";

function LogoutButton(props) {

  const handleLogout = () => {
    props.onLogout();
  };

  return (
    <Button onClick={handleLogout}> Logout Button </Button>
  );
}

export default LogoutButton;
