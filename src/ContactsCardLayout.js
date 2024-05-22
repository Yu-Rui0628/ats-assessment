import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactsCardLayout.css';

const ContactsCardLayout = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the contacts!", error);
      });
  }, []);

  return (
    <div className="contacts-card-layout">
      {contacts.map(contact => (
        <div key={contact.id} className="contact-card">
          <p className='name-text'>{contact.name}</p>
          <p className='content-text'>Email: {contact.email}</p>
          <p className='content-text'>Phone: {contact.phone}</p>
          <p className='content-text'>Website: <a href={`http://${contact.website}`} target="_blank" rel="noopener noreferrer">{contact.website}</a></p>
        </div>
      ))}
    </div>
  );
};

export default ContactsCardLayout;
