import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ contracts, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleSidebar} className="toggle-button">
        <span>{isOpen ? 'Close' : 'Expand'}</span>
      </button>
      {isOpen && (
        <ul className="contract-list">
          {contracts.map((contract) => (
            <li key={contract._id} className="contract-item">
              <a href={`/contracts/${contract._id}`} className="contract-link">
                {contract.clientName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
