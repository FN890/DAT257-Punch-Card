import React from 'react'
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import * as constants from './BookingsNavBarConstants'


export default function BookingsNavbar() {
    return (
        <Toolbar left={LeftContent} right={rightContent} />
    )
}

function LeftContent() {
    return (
        <React.Fragment>
            <NavButton buttonName={constants.bookingsButtonText} url={constants.bookingsNavName} />
            <NavButton buttonName={constants.bookButtonText} url={constants.bookNavName} />
        </React.Fragment>
    )
}


function rightContent() {
    return (
        <React.Fragment>
            <NavButton buttonName={constants.settingsButtonText} url={constants.settingsNavName} />
        </React.Fragment>
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
                <Button label={buttonName} className="p-button-link" onClick={handleClick}></Button>
            ) : (
                <Button label={buttonName} className="p-button-link" onClick={handleClick} disabled></Button>
            )}
        </div>
    );
}
