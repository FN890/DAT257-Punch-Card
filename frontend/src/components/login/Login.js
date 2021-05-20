import React, {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Password} from "primereact/password";
import LoginService from "../services/LoginService";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['JWT']);
    const [userError, setUserError] = useState('');
    const [passwordError, SetPasswordError] = useState('');
    const [error, setError] = useState(false);

    const history = useHistory();

    const loginService = new LoginService();

    const invalidClass = "p-invalid p-d-block"


    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            onLogin()
        }
    }


    const onLogin = async () => {

        if (username.length === 0) {
            setUserError(invalidClass)
            setError(true)
        }
        if (password.length === 0) {
            SetPasswordError(invalidClass)
            setError(true)
        }

        loginService.getToken(username, password).then((resp) => {
            const jwt = resp.data.jwt;
            setCookie("JWT", jwt)
        }).then(() => history.push("/kalender")).catch((error) => {
            console.log(error)
            setError(true)
        })
    };

    useEffect(() => {
        if (cookies.JWT) {
            history.push("/kalender");
        }
    });

    function LoginButton() {
        if (error) {
            return <div>
                <div className="p-d-flex p-mx-5 p-mb-5">
                    <Button label="Logga in" className="p-button-raised p-button-success p-mr-2"
                            iconPos="right" onClick={onLogin}/>


                </div>
                <small id="username2-help" className="p-error p-d-block">fel användarnamn eller lösenord.</small>
            </div>
        }
        return <div className="p-d-flex p-mx-5 p-mb-5">
            <Button label="Logga in" className="p-button-raised p-button-success p-mr-2"
                    iconPos="right" onClick={onLogin}/>
        </div>
    }

    return (
        <div onKeyPress={event => handleEnter(event)}
             style={{
                 position: 'absolute', left: '50%', top: '35%',
                 transform: 'translate(-50%, -50%)'
             }}
        >
            <div className="p-shadow-3" style={{
                position: 'absolute', left: '50%', top: '35%',
                transform: 'translate(-50%, -50%)'
            }}>
                <h1 className="p-flex-md-row p-mx-5 p-mb-5">Logga in</h1>

                <div className="p-mx-5 p-mb-5">
                    <span className="p-float-label">
                        <InputText id="userName" value={username}
                                   onChange={(e) => setUsername(e.target.value)} className={userError}></InputText>
                        <label htmlFor="activityName">Användarnamn</label>
                    </span>
                </div>
                <div className="p-mx-5  p-my-5 p-mb-5">
                    <span className="p-float-label">
                        <Password id="password" value={password} feedback={false}
                                  onChange={(e) => setPassword(e.target.value)} className={passwordError}></Password>
                        <label htmlFor="activityName">lösenord</label>
                    </span>
                </div>
                <LoginButton/>
            </div>

        </div>
    )
}