import React from "react";
import "../css/Ad.css";

class Ad extends React.Component {
  render() {
    return (
      <div className="Ad">
        <h3 className="Ad-title">{this.props.title}</h3>
        {this.props.picture ? (
          <img
            src={`data:image/png;base64,${this.props.picture}`}
            alt={this.props.title}
            crossorigin="anonymous"
          />
        ) : (
          ""
        )}
        <p className="Ad-message">{this.props.message}</p>
        <span className="Ad-phone">Phone: {this.props.phone}</span>
        {this.props.city ? (
          <span className="Ad-city">City: {this.props.city}</span>
        ) : (
          ""
        )}

        <button
          className="Ad-delete-btn btn"
          onClick={() => this.props.deleteHandler(this.props.dateTimestamp)}
        >
          Delete Ad
        </button>
      </div>
    );
  }
}

export default Ad;
