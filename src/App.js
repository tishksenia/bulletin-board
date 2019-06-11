import React from 'react';
import AdsList from './components/AdsList';
import Form from './components/Form';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.appTitle = "Bulletin Board";
    this.state = {
        AdsArray: []
    }
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
    if(adsStoredValue) {
      ads = JSON.parse(adsStoredValue);
    }
    this.setState( { AdsArray: ads} );
  }
  // Removes ALL entries from local storage AND from state
  clearLocalStorage() {
    this.setState({ AdsArray: [] });
    localStorage.clear();    
  }
  // Handle form submit, adding new <Ad /> element (with given arguments) to the AdsArray
  addNewAdItem = (title, message, phone, dateTimestamp) => {
    let ads = this.state.AdsArray;
    let adItem = {
      title, message, phone, dateTimestamp
    }
    ads.push(adItem);
    this.setState({ AdsArray: ads });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.appTitle}</h1>
        <Form addItem={this.addNewAdItem} />
        <AdsList ads={this.state.AdsArray} sort={this.sortAds}/>
        
      </div>
    );
  }
}

export default App;
