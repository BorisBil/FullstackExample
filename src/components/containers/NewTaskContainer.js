import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewTaskView from '../views/NewTaskView';
import { addTaskThunk } from '../../store/thunks';


class NewTaskContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "", 
            description: "",
            priority: "", 
            completion: "", 
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
        if(this.state.name === "") {
            this.setState({error: "Name field is required"});
            return;
        }
        let task = {
            name: this.state.name,
            description: this.state.description,
            priority: this.state.priority,
            completion: this.state.completion,
            employeeId: this.state.employeeId
        };
        
        let newTask = await this.props.addTask(task);

        this.setState({
            redirect: true, 
            redirectId: newTask.id,
            error: ""
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to = {`/tasks/${this.state.redirectId}`}/>)
        }
        return (
            <NewTaskView 
                handleChange = {this.handleChange} 
                handleSubmit = {this.handleSubmit}
                error = {this.state.error}      
            />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addTask: (task) => dispatch(addTaskThunk(task)),
    })
}

export default connect(null, mapDispatch)(NewTaskContainer);