import Navbar from 'react-bootstrap/Navbar'
import {Button, Form, FormControl, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router-dom";

export default function BookingsNavbar() {
    const bookNavName = "/boka";
    const bookButtonText = "Boka";
    const bookingsNavName = "/bokningar";
    const bookingsButtonText = "Bokningar";

    return (
        <Navbar bg="primary" variant="dark">
            <NavButton buttonName={bookingsButtonText} url={bookingsNavName}/>
            <NavButton buttonName={bookButtonText} url={bookNavName}/>
        </Navbar>
    )


}

function NavButton(props) {
    const url = props.url;
    const buttonName = props.buttonName;

    const history = useHistory();

    function handleClick() {
        history.push(url);
    }

    return (
        <Button color="inherit" onClick={handleClick}>{buttonName}</Button>
    );
}
