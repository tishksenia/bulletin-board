import React from "react";
import Ad from "../Ad/Ad.js";
import "./AdsList.scss";

const AdsList = ({ ads, deleteHandler }) => {
  // Sort ads to show the most relevant on top of the AdsList using dateTimestamp key
  // dateTimestamp is +(new Date()) on a moment form was submitted
  const sortedAds = () =>
    ads.sort((a, b) => {
      const aStamp = a.dateTimestamp;
      const bStamp = b.dateTimestamp;
      return bStamp - aStamp;
    });

  const renderAds = () =>
    sortedAds().map(ad => (
      <Ad
        key={ad.dateTimestamp}
        dateTimestamp={ad.dateTimestamp}
        title={ad.title}
        message={ad.message}
        phone={ad.phone}
        city={ad.city}
        deleteHandler={deleteHandler}
      />
    ));

  return (
    <div className="AdsList">
      <h2 className="AdsList__title">Объявление</h2>
      {renderAds()}
    </div>
  );
};

export default AdsList;
