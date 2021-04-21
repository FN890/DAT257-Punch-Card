import { ScrollPanel } from 'primereact/scrollpanel';
import CustomerInfo from "./components/CustomerInfo"
import Activites from "./components/ActivitesButtonGroup"
import FinishButtonGroup from "./components/FinishButtonGroup"
import 'primeflex/primeflex.css';
import ActivitiesButtonGroup from './components/ActivitesButtonGroup';


export default function NewBooking() {
    return (

        <div className="p-shadow-5 p-m-5">
            <div className="p-grid p-dir-col">
                <div className="p-col"><CustomerInfo/></div>
                <div className="p-col"><ActivitiesButtonGroup/></div>
                <div className="p-col"><FinishButtonGroup/></div>
            </div>
        </div>

    )
}

