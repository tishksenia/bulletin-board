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
        
        // format received data if it came from "phone" input
        if(name === "phone") {
            value = this.getFormattedNumber(value);
        }

        this.setState({
            [name]: value
        });
    }
    //Returns phone number in +7 (999) 999-11-11 format
    getFormattedNumber(num) {
        // let numInDigits = num.replace(/[^0123456789]/g, "");
        // let result = "";
        // if(numInDigits.length <= 3) {
        //     result = `(${numInDigits.slice(0,3)})`;
        // }
        // else if(numInDigits.length <= 6) {
        //     result = `(${numInDigits.slice(0,3)}) ${numInDigits.slice(3, 6)}`;
        // }
        // else if(numInDigits.length <= 8) {
        //     result = `(${numInDigits.slice(0,3)}) ${numInDigits.slice(3, 6)}-${numInDigits.slice(6, 8)}`;
        // }
        // else {
        //     result = `(${numInDigits.slice(0,3)}) ${numInDigits.slice(3, 6)}-${numInDigits.slice(6, 8)}-${numInDigits.slice(8, 10)}`;
        // }
        return num.replace(/^(\+7|7|8?)(\d{3})(\d{3})(\d{2})(\d{2})/g, "+7 ($2) $3-$4-$5");
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
                        <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} maxLength="140" required></input>
                    </label>
                    <label>
                        Message
                        <input name="message" type="text" value={this.state.message} onChange={this.handleInputChange} maxLength="300"></input>
                    </label>
                    <label>
                        Phone
                        <input name="phone" type="tel" value={this.state.phone} onChange={this.handleInputChange} maxLength="18" pattern="^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$" placeholder="+7 (111) 111-11-11" required></input>
                    </label>
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}

export default Form;