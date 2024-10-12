"use client";

import React, { useState, useEffect } from "react";
import ContactsPage from "../components/ContactsPage";
import ProfilePage from "../components/Profilepage";
import SettingsPage from "../components/SettingsPage";
import 'font-awesome/css/font-awesome.min.css';
import { getLocation, sendSMS } from "./api/api";

function MainComponent() {
  const [emergency, setEmergency] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Emergency alert from Mom", timestamp: "2 mins ago" },
    { id: 2, message: "Location shared with emergency contacts", timestamp: "5 mins ago" },
    { id: 3, message: "Your heart rate is above normal. Please check your health.", timestamp: "10 mins ago" },
    { id: 4, message: "New message from Dad", timestamp: "15 mins ago" },
  ]);

  // Define the receiver's phone number and email
  const RECEIVER_PHONE_NUMBER = '+12563754207'; // Replace with the actual phone number
  const RECEIVER_EMAIL = 'thabhelo.duve@talladega.edu'; // Replace with the actual email address

  const handleSOS = () => {
    getLocation((location) => {
      const message = `SOS! I need urgent help. My location is: https://www.google.com/maps/@${location.latitude},${location.longitude}`;
      sendSMS(RECEIVER_PHONE_NUMBER, message); 
    });

    setEmergency(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 100);
  };

  // Attach the event listener for the SOS button in useEffect
  useEffect(() => {
    const sosButton = document.getElementById('sos-button');
    if (sosButton) {
      sosButton.addEventListener('click', handleSOS);
    }

    // Clean up the event listener on component unmount
    return () => {
      if (sosButton) {
        sosButton.removeEventListener('click', handleSOS);
      }
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleCameraClick = () => {
    setShowCamera(true);
    // In a real app, you would trigger the device's camera here
    alert("Camera functionality would open here");
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const contacts = [
    { name: "Mom", image: "/imgs/mom.png" },
    { name: "Dad", image: "/imgs/dad.png" },
    { name: "Bro", image: "/imgs/bro.png" },
    { name: "911", image: "/imgs/911.png" },
  ];

  const bottomNav = (
    <div className="flex justify-around items-center p-4 bg-gray-100">
      <div className="flex flex-col items-center" onClick={() => setCurrentPage("home")}>
        <i className="fas fa-home text-orange-400"></i>
        <span className="text-xs text-orange-400">Home</span>
      </div>
      <div className="flex flex-col items-center" onClick={() => setCurrentPage("myCircle")}>
        <i className="fas fa-users text-gray-600"></i>
        <span className="text-xs">My circle</span>
      </div>
      <div className="flex flex-col items-center" onClick={() => setCurrentPage("settings")}>
        <i className="fas fa-cog text-gray-600"></i>
        <span className="text-xs">Settings</span>
      </div>
      <div className="flex flex-col items-center" onClick={() => setCurrentPage("profile")}>
        <i className="fas fa-user text-gray-600"></i>
        <span className="text-xs">Profile</span>
      </div>
    </div>
  );

  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

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
    { name: "Henry Martinez", number: "+1 234-567-8908", icon: "fa-user-friends" },
    { name: "Ivy Chen", number: "+1 234-567-8909", icon: "fa-star" },
    { name: "Jack White", number: "+1 234-567-8910", icon: "fa-user" },
  ];

  const filteredContacts = allContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHomeClick = () => {
    setCurrentPage("home");
    setEmergency(false);
    setProgress(0);
  };

  const renderBottomNav = () => (
    <div className="flex justify-around items-center p-4 bg-gray-100 border-t border-gray-200">
      <div className="flex flex-col items-center" onClick={handleHomeClick}>
        <i className={`fas fa-home ${currentPage === "home" ? "text-blue-500" : "text-gray-600"}`}></i>
        <span className={`text-xs ${currentPage === "home" ? "text-blue-500" : "text-gray-600"}`}>Home</span>
      </div>
      <div className="flex flex-col items-center" onClick={() => setCurrentPage("myCircle")}>
        <i className={`fas fa-users ${currentPage === "myCircle" ? "text-blue-500" : "text-gray-600"}`}></i>
        <span className={`text-xs ${currentPage === "myCircle" ? "text-blue-500" : "text-gray-600"}`}>My circle</span>
      </div>
      <div className="flex flex-col items-center" onClick={() => setCurrentPage("settings")}>
        <i className={`fas fa-cog ${currentPage === "settings" ? "text-blue-500" : "text-gray-600"}`}></i>
        <span className={`text-xs ${currentPage === "settings" ? "text-blue-500" : "text-gray-600"}`}>Settings</span>
      </div>
      <div className="flex flex-col items-center" onClick={() => setCurrentPage("profile")}>
        <i className={`fas fa-user ${currentPage === "profile" ? "text-blue-500" : "text-gray-600"}`}></i>
        <span className={`text-xs ${currentPage === "profile" ? "text-blue-500" : "text-gray-600"}`}>Profile</span>
      </div>
    </div>
  );

  return (
    
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto">
          <div className="flex flex-col min-h-full">
            <div className="flex-1">
              {currentPage === "home" && (
                <div className="h-full">
                  <div className="flex justify-between items-center p-4 bg-gray-100">
                    <div className="text-orange-400 text-2xl">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div className="flex space-x-4">
                      <button onClick={handleCameraClick} className="focus:outline-none">
                        <i className="fas fa-camera text-gray-600 text-xl"></i>
                      </button>
                      <button onClick={handleNotificationClick} className="focus:outline-none relative">
                        <i className="fas fa-bell text-gray-600 text-xl"></i>
                        {notifications.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {notifications.length}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  {showNotifications && (
                    <div className="absolute right-0 mt-12 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                        {notifications.map((notification) => (
                          <div key={notification.id} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 flex flex-col items-center justify-center h-full">
                    {!emergency ? (
                      <>
                        <h2 className="text-2xl font-bold mb-2 text-center">Are you in an emergency?</h2>
                        <p className="text-gray-600 mb-8 text-center max-w-md mx-auto">
                          Press the SOS button, your live location will be shared with the nearest help center and your emergency contacts.
                        </p>
                        <div className="relative mb-12 flex justify-center">
                          <button
                            id="sos-button"
                            onClick={handleSOS}
                            className="w-48 h-48 rounded-full text-white font-bold text-xl shadow-lg relative z-10 bg-red-500 animate-pulse"
                          >
                            <span>SOS</span>
                            <span className="block text-sm">Press 3 seconds</span>
                          </button>
                          <span className="absolute inset-0 rounded-full bg-red-400 animate-ping"></span>
                          <span className="absolute inset-0 rounded-full bg-red-400 animate-ping animation-delay-500"></span>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 mt-4">What's your emergency?</h3>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {[
                            { type: "Medical", icon: "fa-heartbeat", bg: "bg-green-100" },
                            { type: "Fire", icon: "fa-fire", bg: "bg-red-100" },
                            { type: "Other", icon: "fa-exclamation-circle", bg: "bg-blue-100" },
                            { type: "Accident", icon: "fa-car-crash", bg: "bg-purple-100" },
                            { type: "Violence", icon: "fa-fist-raised", bg: "bg-pink-100" },
                            { type: "Rescue", icon: "fa-life-ring", bg: "bg-yellow-100" },
                          ].map((item, index) => (
                            <button key={index} className={`py-2 px-4 rounded-full text-sm font-medium ${item.bg} flex items-center justify-center`}>
                              <i className={`fas ${item.icon} mr-2`}></i>
                              {item.type}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-red-100">
                        <h2 className="text-3xl font-bold mb-4 text-center">Calling emergency...</h2>
                        <p className="text-gray-700 ml-8 mr-8 mb-8 text-center">
                          Please stand by, we are currently requesting help. Your emergency contacts and nearby rescue services will see your call for help.
                        </p>
                        <div className="relative w-64 h-64">
                          <div className="absolute inset-0 bg-red-200 rounded-full opacity-25"></div>
                          <div className="absolute inset-4 bg-red-300 rounded-full opacity-25"></div>
                          <div className="absolute inset-8 bg-red-400 rounded-full opacity-25"></div>
                          <div className="absolute inset-12 bg-red-500 rounded-full flex items-center justify-center">
                            <div className="text-4xl font-bold text-white">{progress}%</div>
                          </div>
                          {contacts.map((contact, index) => (
                            <div key={index} className="absolute w-12 h-12 rounded-full overflow-hidden border-2 border-white" style={{
                              top: `${50 + 40 * Math.sin((index * Math.PI) / 2)}%`,
                              left: `${50 + 40 * Math.cos((index * Math.PI) / 2)}%`,
                              transform: "translate(-50%, -50%)",
                            }}>
                              <img src={contact.image} alt={contact.name} className="w-full h-full object-cover" />
                              <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-[8px] text-center">
                                {contact.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {currentPage === "myCircle" && <ContactsPage />}
              {currentPage === "settings" && <SettingsPage />}
              {currentPage === "profile" && <ProfilePage />}
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 left-0 right-0 z-10">
        {renderBottomNav()}
      </div>
      <style jsx global>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #68D391;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #68D391;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
