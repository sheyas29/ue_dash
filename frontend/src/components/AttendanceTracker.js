import React from 'react';
import AttendanceForm from './AttendanceForm';
import AttendanceDisplay from './AttendanceDisplay';

const AttendanceTracker = ({ contractId }) => {
  console.log('AttendanceTracker contractId:', contractId); // Log to verify

  return (
    <div className="attendance-tracker">
      <AttendanceForm contractId={contractId} />
      <AttendanceDisplay contractId={contractId} />
    </div>
  );
};

export default AttendanceTracker;
