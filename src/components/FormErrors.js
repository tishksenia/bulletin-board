import React from "react";

class FormErrors extends React.Component {
  render() {
    return (
      <div className="FormErrors">
        {this.props.formErrors[this.props.inputName] !== "" ? (
          <p className="FormErrors-error-text">
            {this.props.formErrors[this.props.inputName]}
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default FormErrors;
