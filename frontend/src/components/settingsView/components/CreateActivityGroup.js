import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import 'primeflex/primeflex.css';
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import {RadioButton} from "primereact/radiobutton";
import ActivityService from "../../services/ActivityService";

export default function CreateActivityGroup(props) {


    const [isDaily, setIsDaily] = useState(true);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [maxPeople, setMaxPeople] = useState(null);

    const activityService = new ActivityService();

    function onCreateActivity() {
        console.log(isDaily)
        console.log(price)
        console.log(name)
        console.log(maxPeople)
        activityService.addActivity(name, price, maxPeople, isDaily)
    }

    const setActivity = (e) => {
        setIsDaily(e.value);
    }

    return (

        <div>
            <div className="p-d-flex p-mx-5 p-mb-3">
                <h2>Skapa aktivitet</h2>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <span className="p-float-label">
                <InputText id="activityName" value={name} onChange={(e) => setName(e.target.value)}></InputText>
                     <label htmlFor="activityName">Namn</label>
                </span>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
               <span className="p-float-label">
                <InputNumber id="maxPeople" value={maxPeople} onChange={(e) => setMaxPeople(e.value)}
                             min={0} max={100}></InputNumber>
                   <label htmlFor="maxPeople">Max antal personer</label>
                </span>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
               <span className="p-float-label">
                <InputNumber id="price" value={price} onChange={(e) => setPrice(e.value)} min={0}
                ></InputNumber>
                   <label htmlFor="price">Pris</label>
                </span>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <div className="p-field-radiobutton">
                    <RadioButton inputId="hourly" name="activityType" value={false} onChange={(e) => setActivity(e)}
                                 checked={isDaily === false}/>
                    <label htmlFor="hourly">Timvis bokning</label>
                </div>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <div className="p-field-radiobutton">
                    <RadioButton inputId="daily" name="activityType" value={true} onChange={(e) => setActivity(e)}
                                 checked={isDaily === true}/>
                    <label htmlFor="hourly">Daglig bokning</label>
                </div>
            </div>

            <div className="p-d-flex p-mx-5 p-mb-5">
                <Button label="Skapa aktivitet" className="p-button-raised p-button-success p-mr-2" icon="pi pi-plus"
                        iconPos="right" onClick={onCreateActivity}/>
            </div>


        </div>


    )

}