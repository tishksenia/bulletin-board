import React from "react";
import "./Ad.css";

class Ad extends React.Component {
  render() {
    return (
      <div className="Ad">
        <h3 className="Ad-title">{this.props.title}</h3>
        <p className="Ad-message">{this.props.message}</p>
        <span className="Ad-phone">Phone: {this.props.phone}</span>
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
