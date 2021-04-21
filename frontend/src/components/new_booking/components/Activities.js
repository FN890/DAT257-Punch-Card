export default function Activities(props) {

    const activites = props.activites;

    return (
        <div>
            {activites.map(activity => <div key={activity}> {activity} </div>)}
        </div>
    )
}