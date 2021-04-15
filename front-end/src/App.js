import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ExampleRouter from './example-router/ExampleRouter'
import Bookings from "./components/bookings/Bookings";

const bookings = 'Här kommer bokningar att visas!'
const newBooking = 'Här kommer man kunna skapa nya bokningar!'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/bokningar">
          <ExampleRouter title={bookings} />
          <Bookings/>
        </Route>
        <Route path='/boka'>
          <ExampleRouter title={newBooking} />
        </Route>
        <Route exact path="*" render={() => (
          <Redirect to='/bokningar' />
        )} />
      </Switch>
    </Router>
  );
}

export default App;
