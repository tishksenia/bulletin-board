import React from "react";
import "../css/Form.css";
import FormErrors from "./FormErrors";

// Defines if form is valid or not
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    // if error is empty, valid will not be set to false
    val.length > 0 && (valid = false);
  });
  for (let value in rest) {
    if (value !== "message" && value !== "city")
      rest[value] === "" && (valid = false);
  }
  return valid;
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: "",
      phone: "",
      city: "",
      formErrors: {
        title: "",
        message: "",
        phone: "",
        city: ""
      },
      //inputStatus.field is one of:
      //    default, error, valid
      inputStatus: {
        title: "default",
        message: "default",
        phone: "default",
        city: "default"
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
    let inputStatus = this.state.inputStatus;

    // maximum lengths
    const titleMaxLength = 140;
    const messageMaxLength = 300;
    const phoneMaxLength = 20;

    switch (name) {
      case "title":
        if (value.length === 0) {
          formErrors.title = "Заполните поле";
        } else if (value.length > titleMaxLength) {
          formErrors.title = `Не более ${titleMaxLength} символов`;
        } else {
          formErrors.title = "";
        }
        break;
      case "message":
        if (value.length > messageMaxLength) {
          formErrors.message = `Не более ${messageMaxLength} символов`;
        } else {
          formErrors.message = "";
        }
        break;
      case "phone":
        if (value.length === 0) {
          formErrors.phone = "Заполните поле";
        } else if (
          value.length > phoneMaxLength ||
          !value.match(
            /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
          )
        ) {
          formErrors.phone = "Неверный формат";
        } else {
          formErrors.phone = "";
        }

        break;
      default:
        break;
    }
    let inputState = "";
    formErrors[name].length > 0
      ? (inputState = "error")
      : (inputState = "valid");
    inputStatus[name] = inputState;
    this.setState({
      formErrors,
      [name]: value,
      inputStatus
    });
  };
  setInputStatus(name) {
    let inputState = "";
    const value = this.state.value;
    const formError = this.state.formErrors[name];
    console.log(formError);
    console.log(formError);
    this.state.formErrors[name].length > 0
      ? (inputState = "error")
      : (inputState = "valid");
    let inputStatus = this.state.inputStatus;
    inputStatus[name] = inputState;
    this.setState({ inputStatus });
  }
  //Returns phone number in +7 (999) 999-11-11 format
  getFormattedNumber(num) {
    return num
      .replace(/^(\+7|7|8)(\d{3})(\d{3})(\d{2})(\d{2})/g, "+7 ($2) $3-$4-$5")
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
        this.state.city,
        timestamp
      );
      this.resetFormValues();
    }
  };
  // Clears all form values in state on submit
  resetFormValues() {
    this.setState({
      title: "",
      message: "",
      phone: "",
      city: "",
      formErrors: {
        title: "",
        message: "",
        phone: "",
        city: ""
      }
    });
  }
  render() {
    return (
      <div className="Form">
        <h2 className="Form-heading">Подать объявление</h2>
        <form className="Form-form-group" onSubmit={this.handleFormSubmit}>
          <div className="input-group">
            <div>
              <label className="form-group__label" htmlFor="title">
                Заголовок
              </label>
              <input
                className={`form-group__text-input input ${
                  this.state.formErrors.title.length > 0 ? "error" : ""
                }`}
                id="title"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </div>
            <FormErrors
              inputName="title"
              inputStatus={this.state.inputStatus}
              formErrors={this.state.formErrors}
            />
          </div>

          <div className="input-group">
            <div>
              <label className="form-group__label" htmlFor="message">
                Текст объявления
              </label>
              <textarea
                className={`form-group__text-input input ${
                  this.state.formErrors.message.length > 0 ? "error" : ""
                }`}
                id="message"
                name="message"
                type="text"
                value={this.state.message}
                onChange={this.handleInputChange}
              />{" "}
            </div>
            <FormErrors
              inputName="message"
              inputStatus={this.state.inputStatus}
              formErrors={this.state.formErrors}
            />{" "}
          </div>
          <div className="input-group">
            <div>
              <label className="form-group__label" htmlFor="phone">
                Телефон
              </label>
              <input
                className={`form-group__text-input input ${
                  this.state.formErrors.phone.length > 0 ? "error" : ""
                }`}
                name="phone"
                type="tel"
                placeholder="+7 (___) ___ - __ - __"
                value={this.state.phone}
                onChange={this.handleInputChange}
              />
            </div>
            <FormErrors
              inputName="phone"
              inputStatus={this.state.inputStatus}
              formErrors={this.state.formErrors}
            />
          </div>
          <div className="input-group">
            <div>
              <label className="form-group__label" htmlFor="city">
                Город
              </label>
              <select
                className="form-group__select input"
                name="city"
                id="city"
                value={this.state.city}
                onChange={this.handleInputChange}
              >
                <option value="" />
                <option value="Москва">Москва</option>
                <option value="Хабаровск">Хабаровск</option>
                <option value="Чебоксары">Чебоксары</option>
              </select>
            </div>
            <FormErrors
              inputName="city"
              inputStatus={this.state.inputStatus}
              formErrors={this.state.formErrors}
            />
          </div>
          <input
            className="form-group__submit-btn btn"
            type="submit"
            value="Подать"
          />
        </form>
      </div>
    );
  }
}

export default Form;
