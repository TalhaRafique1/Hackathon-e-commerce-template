"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaGift, FaWallet } from "react-icons/fa";

const GiftCardApp = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [notification, setNotification] = useState<string | null>(null);

  const handleBuy = () => {
    setNotification("Success! Your gift card has been purchased.");
  };

  const handleRedeem = () => {
    setNotification("Voucher redeemed! Enjoy your benefits.");
  };

  const handleBalanceCheck = () => {
    setNotification("Your balance is $100.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-200 p-8">
      <h1 className="text-4xl font-bold text-indigo-700 text-center mb-10">Gift Card Center</h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-6 mb-10">
        {[
          { label: "Buy Card", value: "buy", icon: <FaShoppingCart /> },
          { label: "Redeem", value: "redeem", icon: <FaGift /> },
          { label: "Balance", value: "balance", icon: <FaWallet /> },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveTab(tab.value);
              setNotification(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-sm ${
              activeTab === tab.value
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 hover:bg-indigo-100"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <AnimatePresence mode="wait">
          {activeTab === "buy" && (
            <motion.div
              key="buy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Buy a Gift Card</h2>
              <p className="text-gray-600 mb-6">
                Choose the perfect card for any occasion. Quick and easy to purchase!
              </p>
              <button
                onClick={handleBuy}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all"
              >
                Buy Now
              </button>
            </motion.div>
          )}

          {activeTab === "redeem" && (
            <motion.div
              key="redeem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Redeem Voucher</h2>
              <p className="text-gray-600 mb-6">
                Enter your voucher code to redeem it.
              </p>
              <input
                type="text"
                placeholder="Enter Voucher Code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none mb-4"
              />
              <button
                onClick={handleRedeem}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all"
              >
                Redeem Now
              </button>
            </motion.div>
          )}

          {activeTab === "balance" && (
            <motion.div
              key="balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Balance</h2>
              <p className="text-gray-600 mb-6">Enter your card number to check your balance.</p>
              <input
                type="text"
                placeholder="Enter Card Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none mb-4"
              />
              <button
                onClick={handleBalanceCheck}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all"
              >
                Check Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
          >
            {notification}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GiftCardApp;