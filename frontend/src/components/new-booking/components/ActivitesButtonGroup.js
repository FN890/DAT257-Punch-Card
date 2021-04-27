import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

export default function ActivitiesButtonGroup(props) {

    const onAddActivity = props.onAddActivity;

    return (
        <div className="p-d-flex p-m-5">
            <Button label="Lägg till aktivitet" className="p-button-raised p-button-success p-mr-2" icon="pi pi-plus" iconPos="right" onClick={onAddActivity} />
        </div>
    )
}