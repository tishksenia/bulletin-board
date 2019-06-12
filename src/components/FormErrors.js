import React from "react";

class FormErrors extends React.Component {
  render() {
    return (
      <div className="FormErrors">
        <p className="FormErrors-error-text">
          {this.props.formErrors[this.props.inputName]}
        </p>
      </div>
    );
  }
}

export default FormErrors;
