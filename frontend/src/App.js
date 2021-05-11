import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import ExampleRouter from './example-router/ExampleRouter'
import NavBar from "./components/navbar/Navbar"
import NewBooking from "./components/new-booking/NewBooking"
import Prices from "./components/prices/Prices";
import AllBookingsTable from "./components/allBookingsView/AllBookingsTable";
import Calendar from "./components/calendar/Calendar";
import IndividualBooking from './components/individual_booking/IndividualBooking';
import Settings from "./components/settingsView/Settings";

const newBooking = 'Här kommer man kunna skapa nya bokningar!'
const prices = 'Priser'
const settings = 'Inställningar'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/kalender">
                    <NavBar/>
                    <Calendar/>
                </Route>
                <Route exact path="/allabokningar">
                    <NavBar/>
                    <AllBookingsTable/>
                </Route>
                <Route path="/allabokningar/:id">
                    <NavBar/>
                    <IndividualBooking/>
                </Route>
                <Route path='/nybokning'>
                    <NavBar/>
                    <NewBooking/>
                </Route>
                <Route path='/priser'>
                    <NavBar/>
                    <Prices/>
                </Route>
                <Route path='/installningar'>
                    <NavBar/>
                    <Settings/>
                </Route>
                <Route exact path="*" render={() => (
                    <Redirect to='/kalender'/>
                )}/>
            </Switch>
        </Router>
    );
}

export default App;
