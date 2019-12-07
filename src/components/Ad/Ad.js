import React from "react";
import "./Ad.scss";

const Ad = ({
  deleteHandler,
  title,
  picture,
  message,
  phone,
  city,
  dateTimestamp
}) => {
  return (
    <div className="ad">
      <div className="ad__information">
        <h3 className="ad__title">{title}</h3>
        {picture && (
          <img
            src={`data:image/png;base64,${picture}`}
            alt={title}
            crossorigin="anonymous"
          />
        )}
        <p className="ad__message">{message}</p>
      </div>
      <div className="ad__contacts-and-controls">
        <p className="ad__phone">{phone}</p>
        {city && <p className="ad__city">{city}</p>}

        <div className="ad__controls">
          <button className="ad__edit-btn ad__btn btn">Редактировать</button>
          <button
            className="ad__delete-btn ad__btn btn"
            onClick={() => deleteHandler(dateTimestamp)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ad;
