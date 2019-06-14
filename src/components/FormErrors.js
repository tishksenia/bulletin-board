import React from "react";
import "../css/FormErrors.css";

class FormErrors extends React.Component {
  outputDefault(name) {
    let statusText = "";
    switch (name) {
      case "title":
        statusText = `Обязательное поле\nНе более 140 символов`;
        break;
      case "message":
        statusText = `Не более 300 символов`;
        break;
      case "phone":
        statusText = `Обязательное поле`;
        break;
      case "city":
        return;
      default:
        break;
    }
    return (
      <div className="FormError FormError--default">
        {statusText.split("\n").length > 1 ? (
          statusText.split("\n").map((data, i, arr) => {
            return (
              <p className="FormError__status-text FormError__status-text--default">
                {data} <br />
              </p>
            );
          })
        ) : (
          <p className="FormError__status-text FormError__status-text--default">
            {statusText}
          </p>
        )}
      </div>
    );
  }
  outputError(name) {
    return (
      <div className="FormError FormError--error">
        <p className="FormError__status-text FormError__status-text--error">
          {this.props.formErrors[this.props.inputName]} <br />
        </p>
      </div>
    );
  }
  outputValid() {
    return (
      <div className="FormError FormError--valid">
        <p className="FormError__status-text FormError__status-text--valid">
          Заполнено
        </p>
      </div>
    );
  }
  outputStatus(name) {
    switch (this.props.inputStatus[name]) {
      case "default":
        return this.outputDefault(name);
        break;
      case "error":
        return this.outputError(name);
        break;
      case "valid":
        return this.outputValid();
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className="FormErrors">
        {this.outputStatus(this.props.inputName)}
        {/* {this.props.formErrors[this.props.inputName] !== "" ? (
          <p className="FormErrors-error-text">
            {this.props.formErrors[this.props.inputName]}
          </p>
        ) : (
          ""
        )} */}
      </div>
    );
  }
}

export default FormErrors;
