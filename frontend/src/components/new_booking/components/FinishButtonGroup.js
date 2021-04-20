import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

export default function FinishButtonGroup() {
    return (
        <div className="p-grid p-justify-end">
            <div className="p-col">
                <div className="box">
                    <div className="p-d-flex p-jc-end p-mr-5">
                        <Button label="Avbryt" className="p-button-danger p-button-text p-mr-2" />
                        <Button label="Skapa bokning" className="p-button-raised" />
                    </div>
                </div>
            </div>
        </div>
    )
}