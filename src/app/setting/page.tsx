"use client";

import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // For moon and sun icons
import Link from "next/link"; // Importing Next.js Link component
import Image from "next/image"; // Import the Image component from next/image

interface UserSettings {
  username: string;
  phoneNumber: string;
  notifications: boolean;
  password: string;
  profilePicture: string | null;
  theme: "light" | "dark";
}

export default function SettingsPage() {
  const [userSettings, setUserSettings] = useState<UserSettings>({
    username: "",
    phoneNumber: "",
    notifications: false,
    password: "",
    profilePicture: null,
    theme: "light",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load data from localStorage when the page loads
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("userSettings") || "{}");

    if (savedSettings && savedSettings.username) {
      setUserSettings(savedSettings);
    }
  }, []);

  // Clean up the URL for profile picture when the component unmounts
  useEffect(() => {
    return () => {
      if (userSettings.profilePicture) {
        URL.revokeObjectURL(userSettings.profilePicture);
      }
    };
  }, [userSettings.profilePicture]);

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  };

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setUserSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserSettings((prevSettings) => ({
        ...prevSettings,
        profilePicture: imageUrl,
      }));
    }
  };

  // Handle form submission with basic validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    if (!userSettings.username || !userSettings.phoneNumber) {
      setErrorMessage("Username and Phone Number are required.");
      setIsSaving(false);
      return;
    }

    setTimeout(() => {
      setIsSaving(false);
      saveSettings();
      setSuccessMessage("Settings saved successfully!");
    }, 1000);
  };

  // Handle theme toggle
  const handleThemeChange = () => {
    const newTheme = userSettings.theme === "light" ? "dark" : "light";
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      theme: newTheme,
    }));
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${
        userSettings.theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100"
      }`}
    >
      {/* Sidebar */}
      <div className="md:w-80 w-full bg-white text-black p-6 shadow-md md:sticky top-0">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-500">
            <Link href="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link href="/chatbot">Chatbot</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link href="/category">Category</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link href="/calendar">Calendar</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link href="/faq">FAQ</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link href="/share">shareCar</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link href="/translation">Languages</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link href="/giftcard">GiftCard</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link href="/analytics">Analytics</Link>
          </li>
        </ul>

        {/* Dark/Light Mode Toggle */}
        <div className="flex items-center justify-between mt-6">
          {userSettings.theme === "light" ? (
            <FaMoon
              onClick={handleThemeChange}
              className="cursor-pointer"
              size={24}
            />
          ) : (
            <FaSun
              onClick={handleThemeChange}
              className="cursor-pointer"
              size={24}
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Account Settings
          </h1>

          {/* Success and Error Messages */}
          {successMessage && (
            <div className="bg-green-100 text-green-800 p-4 mb-6 rounded-md">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-4 mb-6 rounded-md">
              {errorMessage}
            </div>
          )}

          {/* Settings Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userSettings.username}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                  placeholder="Enter your username"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userSettings.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password (Optional)
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userSettings.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                  placeholder="Enter a new password"
                />
              </div>

              {/* Profile Picture */}
              <div>
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                />
                {userSettings.profilePicture && (
                  <div className="mt-4 flex justify-center">
                    <Image
                      src={userSettings.profilePicture}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div>
                <label
                  htmlFor="notifications"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enable Notifications
                </label>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={userSettings.notifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm">Enable email notifications</span>
                </div>
              </div>

              {/* Save Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`w-full p-3 bg-blue-600 text-white rounded-md mt-4 ${
                    isSaving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSaving ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}