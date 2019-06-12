import React from "react";
import "./Form.css";
//import './App.css';

// Defines if form is valid or not
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    // if errors is empty, valid will not be set to false
    val.length > 0 && (valid = false);
  });
  for (let value in rest) {
    if (value !== "message") rest[value] === "" && (valid = false);
  }
  console.log(formErrors);
  return valid;
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: "",
      phone: "",
      formErrors: {
        title: "",
        message: "",
        phone: ""
      }
    };
  }
  // Changes input values based on user input
  handleInputChange = event => {
    const name = event.target.name;
    let value = event.target.value;

    // format received data if it came from "phone" input
    if (name === "phone") {
      value = this.getFormattedNumber(value);
    }

    let formErrors = { ...this.state.formErrors };

    // maximum lengths
    const titleMaxLength = 140;
    const messageMaxLength = 300;
    const phoneMaxLength = 20;

    switch (name) {
      case "title":
        formErrors.title =
          value.length > titleMaxLength || value.length === 0
            ? "Title is required and cannot be longer than 140 characters"
            : "";
        break;
      case "message":
        formErrors.message =
          value.length > messageMaxLength
            ? "Message cannot be longer than 140 characters"
            : "";
        break;
      case "phone":
        formErrors.phone =
          value.length === 0 ||
          value.length > phoneMaxLength ||
          !value.match(
            /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
          )
            ? "Phone is required and must be in +7 (111) 111-11-11 form."
            : "";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        [name]: value
      } /*,  () => console.log(this.state)*/
    );
  };
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
    return num
      .replace(/^(\+7|7|8?)(\d{3})(\d{3})(\d{2})(\d{2})/g, "+7 ($2) $3-$4-$5")
      .slice(0, 18);
  }
  // Produces timestamp using current time and passes all the arguments to App > addNewAdItem()
  handleFormSubmit = event => {
    event.preventDefault();

    if (formValid(this.state)) {
      let timestamp = +new Date();
      this.props.addItem(
        this.state.title,
        this.state.message,
        this.state.phone,
        timestamp
      );
      this.resetFormValues();
    } else {
      //error
      console.log("not valid");
    }
  };
  // Clears all form values in state on submit
  resetFormValues() {
    this.setState({
      title: "",
      message: "",
      phone: "",
      formErrors: {
        title: "",
        message: "",
        phone: ""
      }
    });
  }
  render() {
    return (
      <div className="Form">
        <h2 className="Form-heading">Post new Ad</h2>
        <form className="Form-form-group" onSubmit={this.handleFormSubmit}>
          <label className="form-group__label" htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            className={`form-group__text-input ${
              this.state.formErrors.title.length > 0 ? "error" : ""
            }`}
            id="title"
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <label className="form-group__label" htmlFor="message">
            Message
          </label>
          <input
            className={`form-group__text-input ${
              this.state.formErrors.message.length > 0 ? "error" : ""
            }`}
            id="message"
            name="message"
            type="text"
            value={this.state.message}
            onChange={this.handleInputChange}
          />
          <label className="form-group__label" htmlFor="phone">
            Phone <span className="required">*</span>
          </label>
          <input
            className={`form-group__text-input ${
              this.state.formErrors.phone.length > 0 ? "error" : ""
            }`}
            name="phone"
            type="tel"
            value={this.state.phone}
            onChange={this.handleInputChange}
          />
          <input
            className="form-group__submit-btn btn"
            type="submit"
            value="Post"
          />
        </form>
      </div>
    );
  }
}

export default Form;
