export default function Activities(props) {

    const activites = props.activites;

    return (
        <div>
            {activites.map((activity, index) => <div key={index}> {activity} </div>)}
        </div>
    )
}