import React from "react";
import SettingsActivityTable from './SettingsActivityTable';

export default function SettingsPrices(props) {
    return (
        <div>
            <SettingsActivityTable onClickDeleteButton={props.onClickDeleteButton} activities={props.activities}/>
        </div>
    )
}