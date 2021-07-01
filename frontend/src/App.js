import './App.css';
import Navbar from './components/Navbar'
import EmployeesTable from './components/Employees'
import CreateForm from './components/CreateForm'
import Logout from './components/Logout'
import EditForm from './components/EditForm'
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter className="app">
      <Navbar />
      <Switch>
        <Route exact path="/create" component={CreateForm} />
        <Route path="/update/:id" component={EditForm} />
        <Route exact path="/" component={EmployeesTable} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
