'use client';

import { useEffect, useState } from 'react';

const TimeWidget = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '8px',
      textAlign: 'center',
      width: '200px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3 style={{ margin: 0 }}>Current Time</h3>
      <p style={{ fontSize: '24px', margin: '5px 0' }}>{time}</p>
    </div>
  );
};

export default TimeWidget;
