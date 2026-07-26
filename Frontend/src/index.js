import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 24 }}>
      <h1>MedQuick</h1>
      <p>Frontend is running successfully in Docker.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
