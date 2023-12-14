import React from 'react';

const Alert = ({ alert, markAsFalseAlarm }) => {
  const handleMarkAsFalseAlarm = () => {
    markAsFalseAlarm(alert.id);
  };

  return (
    <div className="alert-row">
      <div className="alert-details">
        <div className="top-line">
          <p><strong>{alert.alert_type}</strong> at {new Date(alert.timestamp).toLocaleString()}</p>
        </div>
        <div className="bottom-line">
          <p>Driver: {alert.driver_friendly_name} / Vehicle: {alert.vehicle_friendly_name}</p>
        </div>
      </div>
      <div className="false-alarm-button-container">
        <button onClick={handleMarkAsFalseAlarm} className={`false-alarm-button ${alert.markedAsFalse ? 'marked' : ''}`}>
          {alert.markedAsFalse ? 'Marked as False Alarm' : 'Mark as False Alarm'}
        </button>
      </div>
    </div>
  );
};

export default Alert;
