import React from "react";
import AdsList from "./components/AdsList/AdsList";
import Form from "./components/Form";
import "./css/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.appTitle = "Bulletin Board";
    this.state = {
      AdsArray: []
    };
  }
  componentDidMount() {
    this.retrieveFromLocalStorage();
  }
  componentDidUpdate() {
    this.saveToLocalStorage();
  }
  // Save AdsArray to the local storage, using "AdsArray" key
  saveToLocalStorage() {
    const ads = this.state.AdsArray;
    localStorage.setItem("AdsArray", JSON.stringify(ads));
  }
  // Retrieves / initializes (if no data was retrieved) AdsArray
  retrieveFromLocalStorage() {
    let ads = [];
    let adsStoredValue = localStorage.getItem("AdsArray");
    //if we were able to get stored values
    if (adsStoredValue) {
      ads = JSON.parse(adsStoredValue);
    }
    this.setState({ AdsArray: ads });
  }
  // Removes ALL entries from local storage AND from state
  clearLocalStorage() {
    this.setState({ AdsArray: [] });
    localStorage.clear();
  }
  // Handle form submit, adding new <Ad /> element (with given arguments) to the AdsArray
  addNewAdItem = (title, message, phone, city, dateTimestamp) => {
    let ads = this.state.AdsArray;
    let adItem = {
      title,
      message,
      phone,
      city,
      dateTimestamp
    };
    ads.push(adItem);
    this.setState({ AdsArray: ads });
  };
  // Handle delete button click, removing an Ad item from AdsArray by its timestamp
  deleteAdItem = timestamp => {
    let ads = this.state.AdsArray;
    ads = ads.filter((val, i, arr) => {
      return val.dateTimestamp !== timestamp;
    });
    this.setState({ AdsArray: ads });
  };

  // Determines whether AdsArray is empty or not
  AdsArrayIsEmpty() {
    return this.state.AdsArray.length === 0;
  }

  render() {
    return (
      <div className="App">
        <Form addItem={this.addNewAdItem} />
        {!this.AdsArrayIsEmpty() ? (
          <AdsList
            ads={this.state.AdsArray}
            sort={this.sortAds}
            deleteHandler={this.deleteAdItem}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
