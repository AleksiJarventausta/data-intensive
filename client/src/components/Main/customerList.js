import { List, Button, Image } from "semantic-ui-react";
import { useEffect, useState } from "react";
import CertificationButton from './CertificationStatusButton';

function CustomerListing(props) {


  const [items, setItems] = useState([]);



  const fetchData = async () => {
    //const response = await fetch("/customer");
    //const data = await response.json();

    let authorization = "";
    if (localStorage.jwtTokenTeams) {
      // Set auth token header auth
      authorization = JSON.parse(localStorage.jwtTokenTeams);
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
            >
              <List.Content>
                <List.Header as="a"
                  onClick={(e) => props.setCustomerId(item._id)}
                >
                  {"Name: "}
                  {item.firstname} {item.lastname}
                </List.Header>
              </List.Content>
              <List.Content>
                {" "}
                <List.Icon name="mail" />
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
              <List.Content>
                <CertificationButton onClick={(e) => updateCustomer(item)}></CertificationButton>
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
  
  function updateCustomer(item){
    const certificateStatus ={
      certification_status: true,
      _id: item._id
    };
    console.log(certificateStatus);

    let authorization = ""
    if (localStorage.jwtTokenTeams) {
      // Set auth token header auth
      authorization = JSON.parse(localStorage.jwtTokenTeams);
    }
    fetch("/customer/updatecertification", {
      method: "post",
      body: JSON.stringify(certificateStatus),
      headers: { "Content-Type": "application/json", "Authorization": authorization }
    })
  }

export default CustomerListing;
