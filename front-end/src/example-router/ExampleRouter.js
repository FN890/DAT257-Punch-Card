import './ExampleRouter.css'

export default function ExampleRouter(props) {

  const title = props.title;

  return (
    <div>
      <h1> Hej allihoppa! </h1>
      <h1>{title}</h1>
    </div>
  );
}