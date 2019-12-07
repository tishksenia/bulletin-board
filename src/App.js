import React, { useState, useEffect } from 'react';
import AdsList from './components/AdsList/AdsList';
import Form from './components/Form/Form';
import './App.scss';

const App = () => {
    const [AdsArray, setAdsArray] = useState([]);

    // Save AdsArray to the local storage, using "AdsArray" key
    const saveToLocalStorage = () => {
        localStorage.setItem('AdsArray', JSON.stringify(AdsArray));
    };
    // Retrieves / initializes (if no data was retrieved) AdsArray
    const retrieveFromLocalStorage = () => {
        setAdsArray(JSON.parse(localStorage.getItem('AdsArray')) || []);
    };
    // Removes ALL entries from local storage AND from state
    const clearLocalStorage = () => {
        setAdsArray([]);
        localStorage.clear();
    };

    // Handle form submit, adding new <Ad /> element (with given arguments) to the AdsArray
    const addNewAdItem = (title, message, phone, city, dateTimestamp) => {
        setAdsArray([
            ...AdsArray,
            {
                title,
                message,
                phone,
                city,
                dateTimestamp
            }
        ]);
    };

    // Determines whether AdsArray is empty or not
    const AdsArrayIsEmpty = () => {
        return Boolean(AdsArray.length);
    };

    // Handle delete button click, removing an Ad item from AdsArray by its timestamp
    const deleteAdItem = timestamp => {
        setAdsArray(
            AdsArray.filter((val, i, arr) => {
                return val.dateTimestamp !== timestamp;
            })
        );
    };

    // Will retrieve when component did mount
    useEffect(() => {
        retrieveFromLocalStorage();
        return () => {
            // Cleanup
            saveToLocalStorage();
        };
    }, []);

    useEffect(() => {
        saveToLocalStorage();
    }, [AdsArray]);

    return (
        <div className='app'>
            <Form addItem={addNewAdItem} />
            {AdsArrayIsEmpty() && (
                <AdsList ads={AdsArray} deleteHandler={deleteAdItem} />
            )}
        </div>
    );
};

export default App;
