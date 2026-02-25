import React from 'react';
import DBConnect from './db/db';

export default function App() {

  React.useEffect(() => {
    DBConnect()
    .then(() => {
      console.log("Connected to IndexedDB successfully");
    })
    .catch((err) => {
      console.error("Error connecting to IndexedDB:", err);
    });
    
  }, []);

  return <div className="app">Synapse App placeholder</div>;
}

