import React, { useState, useEffect } from 'react';
import AlertList from './components/AlertList';
import SearchBar from './components/SearchBar';
import './styles.css';

const App = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://mocki.io/v1/01f02f72-88ca-492b-9ee7-8b027f79056c')
      .then(response => response.json())
      .then(data => {
        setAlerts(data);
        setFilteredAlerts(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleFreeTextSearch = (searchQuery) => {
    const filtered = alerts.filter(alert => {
      const searchText = `${alert.alert_type} ${alert.driver_friendly_name} ${alert.vehicle_friendly_name}`;
      return searchText.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredAlerts(filtered);
    setShowSearchResults(true);
  };

  const handleSearchByVehicleNumber = (vehicleNumber) => {
    const filtered = alerts.filter(alert => {
      return alert.vehicle_friendly_name.toLowerCase().includes(vehicleNumber.toLowerCase());
    });
    setFilteredAlerts(filtered);
    setShowSearchResults(true);
  };

  const handleSearchByDateRange = (startDate, endDate) => {
    const filtered = alerts.filter(alert => {
      const alertDate = new Date(alert.timestamp);
      return alertDate >= new Date(startDate) && alertDate <= new Date(endDate);
    });
    setFilteredAlerts(filtered);
    setShowSearchResults(true);
  };

  const handleSearch = (searchData) => {
    const { freeText, vehicleNumber, dateRange } = searchData;
  
    if (freeText !== '') {
      handleFreeTextSearch(freeText);
    } else if (vehicleNumber !== '') {
      handleSearchByVehicleNumber(vehicleNumber);
    } else if (dateRange.start !== '' && dateRange.end !== '') {
      handleSearchByDateRange(dateRange.start, dateRange.end);
    } else {
      
      setFilteredAlerts(alerts);
      setShowSearchResults(false); 
    }
  };

  const markAsFalseAlarm = (alertId) => {
    const updatedAlerts = alerts.map(alert => {
      if (alert.id === alertId) {
       
        return {
          ...alert,
          markedAsFalse: !alert.markedAsFalse
        };
      }
      return alert;
    });
    setAlerts(updatedAlerts);
    setFilteredAlerts(updatedAlerts);
  };

  return (
    <div className="App">
      <h1>Alerts Dashboard</h1>
        {showSearchResults ? (
      <button onClick={() => window.location.reload()}>Back (Refresh)</button>
    ) : (
  <SearchBar onSearch={handleSearch} />
)}

      {showSearchResults ? (
        <div className="search-results">
          <h2>Search Results:</h2>
          {filteredAlerts.length > 0 ? (
            <AlertList alerts={filteredAlerts} markAsFalseAlarm={markAsFalseAlarm} />
          ) : (
            <p>No results found</p>
          )}
        </div>
      ) : (
        <AlertList alerts={filteredAlerts} markAsFalseAlarm={markAsFalseAlarm} />
      )}
    </div>
  );
};

export default App;
