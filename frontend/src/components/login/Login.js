import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <div
            style={{
                position: 'absolute', left: '50%', top: '35%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <div className="p-shadow-3" style={{
                position: 'absolute', left: '50%', top: '35%',
                transform: 'translate(-50%, -50%)'
            }} >
                <h1 className="p-flex-md-row p-mx-5 p-mb-5">Login</h1>

                <div className="p-mx-5 p-mb-5">
                <span className="p-float-label">
                <InputText id="activityName" value={username} onChange={(e) => setUsername(e.target.value)}></InputText>
                     <label htmlFor="activityName">Användarnamn</label>
                </span>
                </div>
                <div className="p-mx-5  p-my-5 p-mb-5">
                <span className="p-float-label">
                <InputText id="activityName" value={password} onChange={(e) => setPassword(e.target.value)}></InputText>
                     <label htmlFor="activityName">lösenord</label>
                </span>
                </div>
                <div className="p-d-flex p-mx-5 p-mb-5">
                    <Button label="Logga in" className="p-button-raised p-button-success p-mr-2"
                            iconPos="right" />
                </div>
            </div>

        </div>
    )
}