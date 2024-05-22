import React from 'react';
import './App.css';
import ContactsCardLayout from './ContactsCardLayout';
import Background from './Background';

function App() {
  return (
    <div className="App">
      <div className="background">
        <Background />
      </div>
      <div className="content">
        <ContactsCardLayout />
      </div>
    </div>
  );
}

export default App;
