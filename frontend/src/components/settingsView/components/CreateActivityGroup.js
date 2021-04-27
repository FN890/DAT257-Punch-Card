import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import 'primeflex/primeflex.css';
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import {RadioButton} from "primereact/radiobutton";

export default function CreateActivityGroup(props) {

    const onCreateActivity = props.onCreateActivity;

    const [activityType, setActivityType] = useState(false);

    const setActivity = (e) => {
        setActivityType(e.value);

    }

    return (

        <div>
            <div className="p-d-flex p-mx-5 p-mb-3">
                <h2>Skapa aktivitet</h2>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <span className="p-float-label">
                <InputText id="activityName"></InputText>
                     <label htmlFor="activityName">Namn</label>
                </span>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
               <span className="p-float-label">
                <InputNumber id="maxPeople"></InputNumber>
                   <label htmlFor="maxPeople">Max antal personer</label>
                </span>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
               <span className="p-float-label">
                <InputNumber id="price"></InputNumber>
                   <label htmlFor="price">Pris</label>
                </span>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <div className="p-field-radiobutton">
                    <RadioButton inputId="hourly" name="activityType" value={false} onChange={(e) => setActivity(e)}
                                 checked={activityType === false}/>
                    <label htmlFor="hourly">Timvis bokning</label>
                </div>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <div className="p-field-radiobutton">
                    <RadioButton inputId="daily" name="activityType" value={true} onChange={(e) => setActivity(e)}
                                 checked={activityType === true}/>
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