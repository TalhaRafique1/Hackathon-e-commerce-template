"use client";

import { useState } from "react";

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Standard Plan",
      description: "Access basic features.",
      price: "$10/month",
      status: "Active",
      renewalDate: "2024-02-01",
    },
    {
      id: 2,
      name: "Pro Plan",
      description: "Access all advanced features.",
      price: "$25/month",
      status: "Inactive",
      renewalDate: "2024-03-15",
    },
  ]);

  const handleAction = (id: number, action: "cancel" | "renew") => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: action === "cancel" ? "Inactive" : "Active",
              renewalDate: action === "renew" ? "2024-05-01" : sub.renewalDate,
            }
          : sub
      )
    );
    alert(
      action === "cancel" ? "Subscription canceled!" : "Subscription renewed!"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-blue-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Manage Your Subscriptions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-md p-6 transform transition hover:scale-105 hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-blue-700">{sub.name}</h2>
              <p className="text-gray-700 mt-2">{sub.description}</p>
              <p className="text-blue-600 font-semibold mt-4">{sub.price}</p>
              <p
                className={`mt-2 text-sm ${
                  sub.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {sub.status}
              </p>
              <p className="text-gray-500 text-sm">
                Renewal: {sub.renewalDate}
              </p>
              <div className="flex justify-between mt-6">
                {sub.status === "Active" ? (
                  <button
                    onClick={() => handleAction(sub.id, "cancel")}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-md shadow-sm hover:bg-red-200"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction(sub.id, "renew")}
                    className="px-4 py-2 bg-green-100 text-green-600 rounded-md shadow-sm hover:bg-green-200"
                  >
                    Renew
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Subscribe to New Plans
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white border border-blue-300 rounded-lg shadow-sm p-6 hover:shadow-md">
              <h3 className="text-lg font-bold text-blue-700">Basic Plan</h3>
              <p className="text-gray-600 mt-2">
                Great for individuals starting out.
              </p>
              <p className="text-blue-600 font-semibold mt-4">$5/month</p>
              <button
                onClick={() => alert("Subscribed to Basic Plan!")}
                className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-all"
              >
                Subscribe
              </button>
            </div>
            <div className="flex-1 bg-white border border-blue-300 rounded-lg shadow-sm p-6 hover:shadow-md">
              <h3 className="text-lg font-bold text-blue-700">Enterprise Plan</h3>
              <p className="text-gray-600 mt-2">
                Best for businesses and teams.
              </p>
              <p className="text-blue-600 font-semibold mt-4">$50/month</p>
              <button
                onClick={() => alert("Subscribed to Enterprise Plan!")}
                className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-all"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;