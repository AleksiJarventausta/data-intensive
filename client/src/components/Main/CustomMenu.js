import { Input, Menu, Container, Button } from "semantic-ui-react";
import { useState } from "react";

export default function CustomMenu (props) {

  const [activeItem, setActiveItem] = useState("");
  const handleItemClick = (e, {name}) => {
    setActiveItem(name)
  }
  const handleLogout = () => {
    props.onLogout();
  };
  return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header position="left"> Signed in as {props.username} </Menu.Item>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
          <Menu.Item
          name="logout"
          onClick={handleLogout} />
          <Menu.Item
            name="My info"
            active={activeItem === "My info"}
            onClick={handleItemClick}
          />

        </Container>
      </Menu>
    );
}

/*
<Menu.Item
  name="friends"
  active={activeItem === "friends"}
  onClick={handleItemClick}
/>
<Menu.Menu position="right">
  <Menu.Item>
    <Input icon="search" placeholder="Search..." />
  </Menu.Item>
</Menu.Menu>
  */
