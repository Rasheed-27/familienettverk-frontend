import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './Spinner.css';

const Spinner = ({ size = 50 }) => {
  return (
    <div className="spinner-container">
      <FaSpinner className="spinner-icon" style={{ fontSize: `${size}px` }} />
    </div>
  );
};

export default Spinner;