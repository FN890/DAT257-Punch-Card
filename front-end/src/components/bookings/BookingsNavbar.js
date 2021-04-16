import Navbar from 'react-bootstrap/Navbar'
import { Button, Form, FormControl, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import * as constants from './BookingsNavBarConstants'


export default function BookingsNavbar() {

    return (
        <Navbar bg="primary" variant="dark">
            <NavButton buttonName={constants.bookingsButtonText} url={constants.bookingsNavName} />
            <NavButton buttonName={constants.bookButtonText} url={constants.bookNavName} />
        </Navbar>
    )


}

function NavButton(props) {
    const url = props.url;
    const buttonName = props.buttonName;

    const location = useLocation();
    const shouldBeEnabled = location.pathname !== url;

    const history = useHistory();

    function handleClick() {
        history.push(url);
    }

    return (
        <div>
            {shouldBeEnabled ? (
                <Button color="inherit" onClick={handleClick}>{buttonName}</Button>
            ) : (
                <Button color="inherit" onClick={handleClick} disabled>{buttonName}</Button>
            )}
        </div>
    );
}
