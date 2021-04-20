import axios from "axios";
import ActivityItem from "./ActivityItem";
import * as ReactBootStrap from "react-bootstrap"

const ActivityTable = () => {
    const activities = [
        {name: "Stugan", price:"100kr/person och natt"},
        {name: "Grill", price:"Gratis :D"},
        {name: "Badtunna", price:"1200 kr"},
        {name: "Bastu", price:"500 kr"},
        {name: "Vattenskidåkning", price:"Vet ej"},
        {name: "Svensex/Möhippa", price:"Mycket"},
    ]

    const renderActivities = (activity, index) => {
        return(

            <tr key = {index}>
                <td>{activity.name}</td>
                <td>{activity.price}</td>
            </tr>
        )
    }
    return (
        <div>
            <h1 id='title'>Priser</h1>

            <ReactBootStrap.Table striped bordered hover>
                <thead>
                <tr>
                    <th>Aktivitetens namn</th>
                    <th>Pris</th>
                </tr>
                </thead>
                <tbody>
                {activities.map(renderActivities)}
                </tbody>
            </ReactBootStrap.Table>
        </div>
    )
}
export default ActivityTable ;