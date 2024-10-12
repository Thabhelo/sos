import React, { useState } from 'react';

const favoriteContacts = [
    {
      name: "911",
      icon: "fa-phone-alt",
      bg: "bg-red-100",
      textColor: "text-red-500",
    },
    {
      name: "Mom",
      icon: "fa-heart",
      bg: "bg-blue-100",
      textColor: "text-blue-500",
    },
    {
      name: "Dad",
      icon: "fa-home",
      bg: "bg-green-100",
      textColor: "text-green-500",
    },
    {
      name: "Sis",
      icon: "fa-female",
      bg: "bg-yellow-100",
      textColor: "text-yellow-500",
    },
    {
      name: "Bro",
      icon: "fa-male",
      bg: "bg-blue-100",
      textColor: "text-blue-500",
    },
];

const allContacts = [
    { name: "Alice Smith", number: "+1 234-567-8901", icon: "fa-star" },
    { name: "Bob Johnson", number: "+1 234-567-8902", icon: "fa-heart" },
    { name: "Charlie Brown", number: "+1 234-567-8903", icon: "fa-user" },
    { name: "David Lee", number: "+1 234-567-8904", icon: "fa-user-friends" },
    { name: "Eva Garcia", number: "+1 234-567-8905", icon: "fa-star" },
    { name: "Frank Wilson", number: "+1 234-567-8906", icon: "fa-user" },
    { name: "Grace Taylor", number: "+1 234-567-8907", icon: "fa-heart" },
    {
      name: "Henry Martinez",
      number: "+1 234-567-8908",
      icon: "fa-user-friends",
    },
    { name: "Ivy Chen", number: "+1 234-567-8909", icon: "fa-star" },
    { name: "Jack White", number: "+1 234-567-8910", icon: "fa-user" },
];

const ContactsPage = () => {
  // Define state for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter contacts based on the search query
  const filteredContacts = allContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">My Circle</h2>
        <div className="flex flex-wrap justify-between mb-4 space-x-2">
          {favoriteContacts.map((contact, index) => (
            <div
              key={index}
              className={`w-16 h-16 ${contact.bg} ${contact.textColor} rounded-full flex flex-col items-center justify-center`}
            >
              <i className={`fas ${contact.icon} text-xl mb-1`}></i>
              <span className="text-xs font-semibold">{contact.name}</span>
            </div>
          ))}
          <div className="w-16 h-16 bg-gray-200 rounded-full flex flex-col items-center justify-center">
            <i className="fas fa-plus text-xl mb-1 text-gray-600"></i>
            <span className="text-xs font-semibold text-gray-600">Add</span>
          </div>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search contacts"
            className="w-full p-2 pl-8 rounded-full border border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {filteredContacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <div className="flex items-center">
              <i
                className={`fas ${contact.icon} text-xl text-gray-500 mr-3`}
              ></i>
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.number}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-green-500 text-white rounded-full">
                <i className="fas fa-phone"></i>
              </button>
              <button className="p-2 bg-blue-500 text-white rounded-full">
                <i className="fas fa-comment"></i>
              </button>
              <button className="p-2 bg-yellow-500 text-white rounded-full">
                <i className="fas fa-star"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
