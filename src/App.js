import React, { useState, useEffect } from 'react';
import AlertList from './components/AlertList';
import SearchBar from './components/SearchBar';
import './styles.css';
import data from './data.json';  

const App = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    
    setAlerts(data);
    setFilteredAlerts(data);
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
      setFilteredAlerts(data);  
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
        <button onClick={() => window.location.reload()}>Back</button>
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

