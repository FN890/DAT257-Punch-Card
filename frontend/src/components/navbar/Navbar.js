import React from 'react'
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { Divider } from 'primereact/divider';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import * as constants from './NavBarConstants'


export default function NavBar() {
    return (
        <Toolbar left={LeftContent} right={rightContent} />
    )
}

function LeftContent() {
    return (
        <React.Fragment>
            <NavButton buttonName={constants.bookButtonText} url={constants.bookNavName} type={'p-button-raised'} />
            <Divider layout="vertical" />
            <NavButton buttonName={constants.allBookingsButtonText} url={constants.allBookingsNavName} type={'p-button-link'} />
            <NavButton buttonName={constants.bookingsButtonText} url={constants.bookingsNavName} type={'p-button-link'} />
            <NavButton buttonName={constants.pricesButtonText} url={constants.pricesNavName} type={'p-button-link'} />


        </React.Fragment>
    )
}


function rightContent() {
    return (
        <React.Fragment>
            <NavButton buttonName={constants.settingsButtonText} url={constants.settingsNavName} type={'p-button-link'}/>
        </React.Fragment>
    )
}

function NavButton(props) {
    const url = props.url;
    const buttonName = props.buttonName;
    const type = props.type;

    const location = useLocation();
    const shouldBeEnabled = location.pathname !== url;

    const history = useHistory();

    function handleClick() {
        history.push(url);
    }

    return (
        <div>
            {shouldBeEnabled ? (
                <Button label={buttonName} className={type} onClick={handleClick}></Button>
            ) : (
                <Button label={buttonName} className={type} onClick={handleClick} disabled></Button>
            )}
        </div>
    );
}
