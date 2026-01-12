import React, { useState } from 'react';
import './tools.css'; // Assuming you have a CSS file for styling



const Toast = (props) => {

  return (
    <div className="toast-container">
      {props.messages.map(msg => (
        <div key={msg.id} className={`toast-${msg.type}`}>
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
