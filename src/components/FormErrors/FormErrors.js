import React from "react";
import "./FormErrors.scss";

class FormErrors extends React.Component {
  // Given input's name, outputs its default status
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
              <p
                key={i}
                className="FormError__status-text FormError__status-text--default"
              >
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
  // Given input's name, outputs corresponding error
  outputError(name) {
    return (
      <div className="FormError FormError--error">
        <p className="FormError__status-text FormError__status-text--error">
          {this.props.formErrors[this.props.inputName]} <br />
        </p>
      </div>
    );
  }
  // Outputs valid status
  outputValid() {
    return (
      <div className="FormError FormError--valid">
        <p className="FormError__status-text FormError__status-text--valid">
          Заполнено
        </p>
      </div>
    );
  }
  // Outputs input status based on it's inputStatus
  outputStatus(name) {
    switch (this.props.inputStatus[name]) {
      case "default":
        return this.outputDefault(name);
      case "error":
        return this.outputError(name);
      case "valid":
        return this.outputValid();
      default:
        break;
    }
  }
  render() {
    return (
      <div className="FormErrors">
        {this.outputStatus(this.props.inputName)}
      </div>
    );
  }
}

export default FormErrors;
