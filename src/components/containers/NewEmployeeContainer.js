import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewEmployeeView from '../views/NewEmployeeView';
import { addEmployeeThunk } from '../../store/thunks';


class NewEmployeeContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: "", 
            lastname: "",
            department: "", 
            employeeID: null, 
            redirect: false, 
            redirectId: null,
            error: ""
        };
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = async event => {
        event.preventDefault();
        if(this.state.lastname === "") {
            this.setState({error: "Last Name field is required"});
            return;
        }
        let employee = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            department: this.state.department
        };
        
        let newEmployee = await this.props.addEmployee(employee);

        this.setState({
            redirect: true, 
            redirectId: newEmployee.id,
            error: ""
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to = {`/employees/${this.state.redirectId}`}/>)
        }
        return (
            <NewEmployeeView 
                handleChange = {this.handleChange} 
                handleSubmit = {this.handleSubmit}
                error = {this.state.error}      
            />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addEmployee: (employee) => dispatch(addEmployeeThunk(employee)),
    })
}

export default connect(null, mapDispatch)(NewEmployeeContainer);