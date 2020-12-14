import { Button, Grid, Header, Form} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import NewForm from './NewUserForm';
import { useEffect, useState} from 'react';

//tällä hetkellä toimisi jos saisi listan eikä objectin

function CustomerListing() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  

    useEffect(() => {
      fetch("http://localhost:8080/customer/")
        //.then(res => res.json())
        .then(res => res.text())
        .then(text => console.log(text))
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
//        <ul>
//          {items.map(item => (
//            <li key={item.id}>
//              {item.name}
//            </li>
//          ))}
//        </ul>
<h1>FAIL</h1>
);
    }
  }
export default CustomerListing;