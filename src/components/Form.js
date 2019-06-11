import React from 'react';
//import './App.css';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            message: "",
            phone: ""
        }
    }
    // Changes input values based on user input
    handleInputChange = event => {
        const name = event.target.name;
        let value = event.target.value;
        if(name === "phone") {
            value = this.getFormattedNumber(value);
            
        }
        this.setState({
            [name]: value
        });
    }
    //!!!
    //Returns phone number in +7 (999) 999-11-11 format
    getFormattedNumber(num) {
        let result = num.replace(/[^0123456789]/g, "");
        
        // let code = value.slice(0, 3);
        // let num = `(${code})`;
        // if(value.length > 3) {
        //     num = `(${code}) ${value.slice(3, 6)}`;
        // }
        // else if(value.length > 5) {
        //     num = `(${code}) ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}`;
        // }
        
        return result;
    }
    // Produces timestamp using current time and passes all the arguments to App > addNewAdItem()
    handleFormSubmit = event => {
        event.preventDefault();
        let timestamp = +(new Date());
        this.props.addItem(
            this.state.title, 
            this.state.message, 
            this.state.phone,
            timestamp
            );
        this.resetFormValues();
    }
    // Clears all form values in state on submit
    resetFormValues() {
        this.setState({
            title: "",
            message: "",
            phone: ""
        });
    }
    render() {
        return(
            <div>
                <h2>Post new Ad</h2>
                <form onSubmit={this.handleFormSubmit}>
                    <label>
                        Title
                        <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} ></input>
                    </label>
                    <label>
                        Message
                        <input name="message" type="text" value={this.state.message} onChange={this.handleInputChange} ></input>
                    </label>
                    <label>
                        Phone
                        <input name="phone" type="text" value={this.state.phone} onChange={this.handleInputChange} ></input>
                    </label>
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}

export default Form;