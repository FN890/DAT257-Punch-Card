import {InputText} from "primereact/inputtext";
import React, {useEffect, useState} from "react";
import 'primeflex/primeflex.css';
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import {RadioButton} from "primereact/radiobutton";
import ActivityService from "../../services/ActivityService";
import {Editor} from "primereact/editor";
import SettingsPrices from "./SettingsPrices";

export default function CreateActivityGroup() {
    const activityService = new ActivityService();
    const [activities, setActivities] = useState(undefined);
    const [isDaily, setIsDaily] = useState(true);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [hprice, setHPrice] = useState(null);
    const [dprice, setDPrice] = useState(null);
    const [perprice, setPerPrice] = useState(null);
    const [maxPeople, setMaxPeople] = useState(null);
    const [faq, setFaq] = useState()

    /**
     * Posts a new activity to the database
     * after the new activity has been posted it requests
     * all the activities and uses setActivities to set new info
     * which causes a rerender
     */
    useEffect(() => {
        activityService.getActiveActivities().then(data => setActivities(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    function onCreateActivity() {
        console.log(faq);
        activityService.addActivity(name, price, hprice, dprice, perprice, maxPeople, isDaily, faq).then(() => activityService.getActiveActivities().then(data => setActivities(data)))
    }

    const setActivity = (e) => {
        setIsDaily(e.value);
    }
    const onDelete = (name) => {
        activityService.deleteActivity(name).then(() => activityService.getActiveActivities().then(data => setActivities(data)))
    }
    const header = (
        <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
    </span>
    );

    return (
        <div className="p-d-flex p-flex-column p-flex-md-row p-ai-start p-mx-5 p-mb-5">
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
                             min={0}></InputNumber>
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
               <span className="p-float-label">
                <InputNumber id="hprice" value={hprice} onChange={(e) => setHPrice(e.value)} min={0}
                ></InputNumber>
                   <label htmlFor="hprice">Pris per timme</label>
                </span>
                </div>
                <div className="p-d-flex p-mx-5 p-mb-5">
               <span className="p-float-label">
                <InputNumber id="dprice" value={dprice} onChange={(e) => setDPrice(e.value)} min={0}
                ></InputNumber>
                   <label htmlFor="dprice">Pris per dag</label>
                </span>
                </div>
                <div className="p-d-flex p-mx-5 p-mb-5">
               <span className="p-float-label">
                <InputNumber id="perprice" value={perprice} onChange={(e) => setPerPrice(e.value)} min={0}
                ></InputNumber>
                   <label htmlFor="perprice">Pris per person</label>
                </span>
                </div>
                <div className="p-d-flex p-mx-5 p-mb-5">

                    <Editor style={{height: '200px', width: '200px'}} value={""}
                            onTextChange={(e) => setFaq(e.htmlValue)} headerTemplate={header}
                            placeholder={" FAQ Saker som är bra att veta om denna aktivitet är:"}/>
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
                    <Button label="Skapa aktivitet" className="p-button-raised p-button-success p-mr-2"
                            icon="pi pi-plus"
                            iconPos="right" onClick={onCreateActivity}/>
                </div>
            </div>
            <div className="p-m-3">
                <SettingsPrices activities={activities} onClickDeleteButton={onDelete}/>
            </div>
        </div>


    )

}