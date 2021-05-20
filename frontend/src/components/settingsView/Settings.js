import 'primeflex/primeflex.css';
import CreateActivityGroup from "./components/CreateActivityGroup";
import SettingsCreateAcc from "./components/SettingsCreateAcc";

export default function Settings() {

    return (
        <div>
            <div className="p-shadow-5 p-m-3">
                <div><CreateActivityGroup/></div>

            </div>
            <div className="p-shadow-5 p-m-3">

                <div><SettingsCreateAcc/></div>
            </div>
        </div>
    )
}