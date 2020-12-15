import { List, Button, Image } from "semantic-ui-react";
import { useEffect, useState } from "react";

function CustomerListing(props) {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/customer");
    const data = await response.json();
    setItems(data);
  };

  return (
    <>
      <h3>Customers</h3>
      {items.length > 0 ? (
        <List>
          {items.map((item) => (
            <List.Item key={item._id} onClick={(e) => props.setCustomerId(item._id) }>
              <List.Content>
                <List.Header as="a">
                  {"Name: "}
                  {item.firstname} {item.lastname}
                </List.Header>
              </List.Content>
              <List.Icon name="mail" />
              <List.Content>
                {" "}
                {"Address: "} {item.address}
              </List.Content>
              <List.Content>
                {" "}
                {"Social security: "} {item.ssn}
              </List.Content>
            </List.Item>
          ))}
        </List>
      ) : (
        <Button onClick={fetchData}>Fetch customers</Button>
      )}
    </>
  );
}
export default CustomerListing;
