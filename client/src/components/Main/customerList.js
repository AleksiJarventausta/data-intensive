import { Button, Grid, Header, Form, List } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import NewForm from "./NewUserForm";
import { useEffect, useState } from "react";

//tällä hetkellä toimisi jos saisi listan eikä objectin

function CustomerListing() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/customer")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <>
      <h1>Customers</h1>
      <List>
        {items.map((item) => (
          <List.Item key={item._id}>
            <List.Content> {item.firstname}</List.Content>
            <List.Content> {item.lastname}</List.Content>
            <List.Content> {item.address}</List.Content>
            <List.Content> {item.ssn}</List.Content>
          </List.Item>
        ))}
      </List>
    </>
  );
}
export default CustomerListing;
