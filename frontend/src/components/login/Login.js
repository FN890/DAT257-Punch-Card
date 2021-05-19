import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Password} from "primereact/password";
import LoginService from "../services/LoginService";
import {useCookies} from "react-cookie";

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['JWT']);
    const loginService = new LoginService();

    const onLogin = async () => {
        console.log(username)
        console.log(password)

        loginService.getToken(username, password).then((resp) => {
            const jwt = resp.data.jwt;
            setCookie("JWT",jwt)
        }).catch((error) => {console.log(error) })
    };

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
            }}>
                <h1 className="p-flex-md-row p-mx-5 p-mb-5">Login</h1>

                <div className="p-mx-5 p-mb-5">
                <span className="p-float-label">
                <InputText id="userName" value={username} onChange={(e) => setUsername(e.target.value)}></InputText>
                     <label htmlFor="activityName">Användarnamn</label>
                </span>
                </div>
                <div className="p-mx-5  p-my-5 p-mb-5">
                <span className="p-float-label">
                <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)}></Password>
                     <label htmlFor="activityName">lösenord</label>
                </span>
                </div>
                <div className="p-d-flex p-mx-5 p-mb-5">
                    <Button label="Logga in" className="p-button-raised p-button-success p-mr-2"
                            iconPos="right" onClick={onLogin}/>
                </div>
            </div>

        </div>
    )
}