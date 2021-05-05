

export default function PriceCalculation(props) {

    const activities = props.activities

    const calculateDuration = () => {
        console.log(activities)
        const ArrivalTime = new Date(this.startTime);
        const LeaveTime = new Date(this.endTime);
        // calculate difference
        let diff=LeaveTime-ArrivalTime;
        let hours=(((diff/1000)/60)/60);
        return hours;
    }

    return (
        <div className="p-d-flex">
            <div className="p-mr-2">Total Pris</div>
            <div>PRIS</div>
        </div>
    )
}