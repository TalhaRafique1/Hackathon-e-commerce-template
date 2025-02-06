'use client';

import { useState, useEffect } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<
    { id: number; text: string; isRead: boolean }[]
  >([]);

  // Fetch notifications from local storage on component mount
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    if (storedNotifications.length === 0) {
      // If no notifications are found in local storage, add some sample notifications
      const sampleNotifications = [
        { id: 1, text: "New car added to the collection.", isRead: false },
        { id: 2, text: "Price update for the car rental service.", isRead: false },
        { id: 3, text: "Your wishlist has been updated.", isRead: false },
      ];
      setNotifications(sampleNotifications);
      localStorage.setItem("notifications", JSON.stringify(sampleNotifications));
    } else {
      setNotifications(storedNotifications);
    }
  }, []);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    // Update local storage
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const handleDelete = (id: number) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Notifications</h1>
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No notifications to show.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.isRead
                    ? "bg-gray-100 border-gray-300"
                    : "bg-blue-50 border-blue-300"
                } shadow-sm transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <p className="text-gray-700 flex-1">{notification.text}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    {!notification.isRead && (
                      <button
                        className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors duration-200"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      className="text-red-600 font-medium hover:underline hover:text-red-700 transition-colors duration-200"
                      onClick={() => handleDelete(notification.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}