import React from "react";
import "../css/Ad.css";

class Ad extends React.Component {
  render() {
    return (
      <div className="Ad">
        <div className="Ad-information">
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
        </div>
        <div className="Ad-contacts-and-controls">
          <p className="Ad-phone">{this.props.phone}</p>
          {this.props.city ? <p className="Ad-city">{this.props.city}</p> : ""}

          <div className="controls">
            <button className="Ad-edit-btn Ad-btn btn">Редактировать</button>
            <button
              className="Ad-delete-btn Ad-btn btn"
              onClick={() => this.props.deleteHandler(this.props.dateTimestamp)}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Ad;
