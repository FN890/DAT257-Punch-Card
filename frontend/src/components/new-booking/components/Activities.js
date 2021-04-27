export default function Activities(props) {

    const activities = props.activities;

    return (
        <div>
            {activities.map((activity, index) => <div key={index}> {activity} </div>)}
        </div>
    )
}