import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

 
  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://contactx-cdi6.onrender.com/api/contacts', {
        withCredentials: true,
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error.response?.data || error.message);
    }
  };

  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">All Contacts</h1>

      
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name"
            className="w-full p-4 text-lg rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="space-y-6">
          {filteredContacts.length === 0 ? (
            <p className="text-center text-gray-400">No contacts found</p>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className="p-6 bg-gray-700 rounded-md shadow-md flex justify-between items-center"
              >
                <div className="flex flex-col space-y-2 w-full">
                  <span className="text-2xl font-semibold text-white">{contact.name}</span>
                  <span className="text-lg text-gray-300">{contact.email}</span>
                  <span className="text-lg text-gray-300">{contact.mobile}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
