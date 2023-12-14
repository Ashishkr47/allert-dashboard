import React from 'react';
import Alert from './Alert';

const AlertList = ({ alerts, markAsFalseAlarm }) => {
  return (
    <div className="alert-list">
      <h2>Alerts</h2>
      {alerts.map(alert => (
        <Alert key={alert.id} alert={alert} markAsFalseAlarm={markAsFalseAlarm} />
      ))}
    </div>
  );
};

export default AlertList;


