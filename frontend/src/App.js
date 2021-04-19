import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ExampleRouter from './example-router/ExampleRouter'
import Bookings from "./components/bookings/Bookings";
import NavBar from "./components/navbar/Navbar"

const newBooking = 'Här kommer man kunna skapa nya bokningar!'
const prices = 'Priser'
const settings = 'Inställningar'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/bokningar">
          <NavBar/>
          <Bookings/>
        </Route>
        <Route path='/nybokning'>
        <NavBar/>
          <ExampleRouter title={newBooking} />
        </Route>
        <Route path='/priser'>
        <NavBar/>
          <ExampleRouter title={prices} />
        </Route>
        <NavBar/>
        <Route path='/installningar'>
          <ExampleRouter title={settings} />
        </Route>
        <Route exact path="*" render={() => (
          <Redirect to='/bokningar' />
        )} />
      </Switch>
    </Router>
  );
}

export default App;
