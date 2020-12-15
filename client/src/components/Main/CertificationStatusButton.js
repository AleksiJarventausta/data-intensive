import { Button } from "semantic-ui-react";

function CertificationButton(props) {

    const certficate = () => {
        console.log(props);
    };
 
  return (
    <Button primary onClick={certficate}> Certificate </Button>
  );
}
export default CertificationButton;
