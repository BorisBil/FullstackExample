import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";

//Components
import {
  HomePageContainer,
  TaskContainer,
  AllTasksContainer,
  NewTaskContainer,
  EditTaskContainer,
  EmployeeContainer,
  AllEmployeesContainer,
  EditEmployeeContainer,
  NewEmployeeContainer
} from './components/containers';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component = {HomePageContainer} />
        <Route exact path="/tasks" component = {AllTasksContainer} />
        <Route exact path="/tasks/:id" component = {TaskContainer} />
        <Route exact path="/edittask/:id" component = {EditTaskContainer} />
        <Route exact path="/newtask" component = {NewTaskContainer} />
        <Route exact path="/employees" component = {AllEmployeesContainer} />
        <Route exact path="/employees/:id" component = {EmployeeContainer} />
        <Route exact path="/editemployee/:id" component = {EditEmployeeContainer} />
        <Route exact path="/newemployee" component = {NewEmployeeContainer} />
      </Switch>        
    </div>
  );
}

export default App;
