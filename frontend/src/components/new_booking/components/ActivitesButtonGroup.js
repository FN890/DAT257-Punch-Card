import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

export default function ActivitiesButtonGroup(props) {

    const onAddActivity = props.onAddActivity;
    const onRemoveActivity = props.onRemoveActivity;

    return (
        <div className="p-grid p-justify p-m-4">
            <Button label="Lägg till aktivitet" className="p-button-raised p-button-success p-mr-2" icon="pi pi-plus" iconPos="right" onClick={onAddActivity}/>
            <Button label="Ta bort aktivitet" className="p-button-raised p-button-danger" icon="pi pi-trash" iconPos="right" onClick={onRemoveActivity}/>
        </div>
    )
}