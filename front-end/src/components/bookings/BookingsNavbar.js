import Navbar from 'react-bootstrap/Navbar'
import {Button, Form, FormControl, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router-dom";

export default function BookingsNavbar() {
    const navName = "/boka";

    return (
        <Navbar bg="primary" variant="dark">
            <NavButton url={navName}/>
        </Navbar>
    )


}

function NavButton(props) {
    const url = props.url;
    const history = useHistory();

    function handleClick() {
        history.push(url);
    }

    return (
        <Button color="inherit" onClick={handleClick}>Boka</Button>
    );
}
