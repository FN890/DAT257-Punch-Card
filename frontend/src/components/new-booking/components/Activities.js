export default function Activities(props) {

    const activities = props.activities;

    return (
        <div>
            {activities.map((component, index) => <div key={index}> {component.activity} </div>)}
        </div>
    )
}