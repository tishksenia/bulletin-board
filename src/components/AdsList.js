import React from 'react';
import Ad from './Ad'
//import './App.css';

class AdsList extends React.Component {
    // Renders ads from AdsArray, passed down using props
    renderAds() {
        const ads = this.sortAds(this.props.ads);

        const adsItems = ads.map((ad) => 
            <Ad key={ad.dateTimestamp} dateTimestamp={ad.dateTimestamp} title={ad.title} message={ad.message} phone={ad.phone} deleteHandler={this.props.deleteHandler} />
        );
        return adsItems;
    }
    // Sort ads to show the most relevant on top of the AdsList using dateTimestamp key
    // dateTimestamp is +(new Date()) on a moment form was submitted
    sortAds(ads) {
        return ads.sort((a, b) => {
          const aStamp = a.dateTimestamp;
          const bStamp = b.dateTimestamp;
          return bStamp - aStamp;
        });
    }
    render() {
        return(
            <div className="ad-list">
                <h2>Available Ads</h2>
                {this.renderAds()}
            </div>
        );
    }
}

export default AdsList;