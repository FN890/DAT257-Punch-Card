import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import LoginService from "../../services/LoginService";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";

export default function SettingsCreateAcc() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userEmpty, setUserEmpty] = useState('');
    const [passwordEmpty, setPasswordEmpty] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const invalidClass = "p-invalid p-d-block"
    const loginService = new LoginService();
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['JWT']);

    function CreateInfo() {
        if (error) {
            return (
                <div>
                    <small id="username2-help" className="p-error p-d-block">minst tre tecken</small>
                    <small id="username2-help" className="p-error p-d-block">i båda fälten.</small>
                </div>
            )
        } else if (success) {
            return <div><small id="username2-help" className=" p-d-block">skapade konto med namn:</small>
                <small id="username2-help" className="p-d-block">{username}</small></div>
        } else return <div></div>
    }

    function createAccount() {
        if (username.length <= 2 || password.length <= 2) {
            setError(true);
            if (username.length <= 2) {
                setUserEmpty(invalidClass)
            }
            if (password.length <= 2) {
                setPasswordEmpty(invalidClass)
            }
            return;
        }
        loginService.createAccount(username, password, cookies.JWT).then(() => {
            setSuccess(true);
            setError(false);
        }).catch((error) => {
            setError(true);
            console.log(error)
        })
    }

    return (
        <div className="p-d-flex p-flex-column p-flex-md-row p-ai-start p-mx-5 p-mb-5">
            <div>
                <h2>Skapa konto</h2>
                <div className="p-d-flex p-mx-5 p-mb-5">
                    <span className="p-float-label">
                        <InputText id="activityName" value={username} className={userEmpty}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="activityName">Namn</label>
                    </span>
                </div>
                <div className="p-d-flex p-mx-5 p-mb-5">
                    <div>
                    <span className="p-float-label">
                        <Password id="activityName" value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="activityName">lösenord</label>
                    </span>
                        <div className="p-d-flex p-mx-5 p-mb-5">
                        </div>
                        <Button label="Skapa konto" className="p-button-raised p-button-success p-mr-2"
                                icon="pi pi-plus"
                                iconPos="right" onClick={createAccount}/>
                        <CreateInfo/>
                    </div>

                </div>

            </div>


        </div>


    )
}