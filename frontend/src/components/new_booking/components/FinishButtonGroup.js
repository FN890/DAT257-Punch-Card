import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

export default function FinishButtonGroup() {
    return (
        <div className="p-grid p-justify-end p-m-3">
                <Button label="Avbryt" className="p-button-danger p-button-text p-mr-2" />
                <Button label="Skapa bokning" className="p-button-raised" />
        </div>
    )
}