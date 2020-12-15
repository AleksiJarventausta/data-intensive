import { List, Button, Image } from "semantic-ui-react";
import { useEffect, useState } from "react";

function CustomerListing(props) {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    //const response = await fetch("/customer");
    //const data = await response.json();

    let authorization = "";
    if (localStorage.jwtTokenTeams) {
      // Set auth token header auth
      authorization = localStorage.jwtTokenTeams;
    }

    fetch("customer", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
      });
  };

  return (
    <>
      <h3>Customers</h3>
      {items.length > 0 ? (
        <List>
          {items.map((item) => (
            <List.Item
              key={item._id}
              onClick={(e) => props.setCustomerId(item._id)}
            >
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

              <List.Content>
                {item.certification_status ? (
                  <h5>Customer processed</h5>
                ) : (
                  <h5>
                    {" "}
                    <List.Icon name="warning" />
                    Customer not processed
                  </h5>
                )}
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
