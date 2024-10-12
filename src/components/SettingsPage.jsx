import React, { useState } from 'react';

const SettingsPage = () => (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <h2 className="text-2xl font-bold p-4 bg-white text-center">SETTINGS</h2>
      <div className="p-4">
        <SettingsSection title="Notifications">
          <ToggleSetting label="Push Notifications" />
          <ToggleSetting label="Alert Sound" />
          <ToggleSetting label="Vibrations" />
        </SettingsSection>
        <SettingsSection title="Emergency Triggers">
          <div className="flex items-center justify-between">
            <span>Double-Tap Action</span>
            <i className="fas fa-phone text-blue-500"></i>
          </div>
          <ToggleSetting label="Audio Recording" />
        </SettingsSection>
        <SettingsSection title="Location Settings">
          <ToggleSetting label="Share Location" />
        </SettingsSection>
        <SettingsSection title="Health Monitoring">
          <ToggleSetting label="Heart Rate Alerts" />
        </SettingsSection>
        <SettingsSection title="Account Settings">
          <button className="w-full text-left py-2">Change Password</button>
          <button
            className="w-full text-left py-2"
            onClick={() => setCurrentPage("myCircle")}
          >
            Manage Trusted Contacts
          </button>
        </SettingsSection>
        <SettingsSection title="App Settings">
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <select className="bg-white border rounded p-1">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span>Language</span>
            <select className="bg-white border rounded p-1">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Zulu</option>
              <option>Igbo</option>
            </select>
          </div>
        </SettingsSection>
        <SettingsSection title="Help & Support">
          <button className="w-full text-left py-2">FAQ</button>
          <button className="w-full text-left py-2">Contact Support</button>
        </SettingsSection>
      </div>
    </div>
  );

  const SettingsSection = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="bg-white rounded-lg p-4 shadow">{children}</div>
    </div>
  );
  
  const ToggleSetting = ({ label }) => (
    <div className="flex items-center justify-between py-2">
      <span>{label}</span>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={label}
          id={label}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label
          htmlFor={label}
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>
  );
export default SettingsPage;