"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { BsArrowDownUp } from "react-icons/bs";
import Image from "next/image";

// Define types for Pick-Up and Drop-Off state
type PickDropState = {
  location: string;
  date: string;
  time: string;
};

// List of countries/cities (can be replaced with an API call)
const countries = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

export default function PickDropSection() {
  // State for Pick-Up and Drop-Off values
  const [pickUp, setPickUp] = useState<PickDropState>({
    location: "Select your city",
    date: new Date().toISOString().split("T")[0], // Current date
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // Current time
  });

  const [dropOff, setDropOff] = useState<PickDropState>({
    location: "Select your city",
    date: new Date().toISOString().split("T")[0], // Current date
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // Current time
  });

  // State to manage dropdown visibility
  const [showLocationDropdown, setShowLocationDropdown] = useState<{
    pickUp: boolean;
    dropOff: boolean;
  }>({ pickUp: false, dropOff: false });

  // Function to handle swapping Pick-Up and Drop-Off values
  const handleSwap = () => {
    setPickUp(dropOff);
    setDropOff(pickUp);
  };

  // Function to handle dropdown selection
  const handleSelect = (section: "pickUp" | "dropOff", field: keyof PickDropState, value: string) => {
    if (section === "pickUp") {
      setPickUp((prev) => ({ ...prev, [field]: value }));
    } else if (section === "dropOff") {
      setDropOff((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Function to toggle location dropdown
  const toggleLocationDropdown = (section: "pickUp" | "dropOff") => {
    setShowLocationDropdown((prev) => ({
      pickUp: section === "pickUp" ? !prev.pickUp : false,
      dropOff: section === "dropOff" ? !prev.dropOff : false,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 mt-10">
      {/* Pick-Up Section */}
      <div className="flex items-center bg-white shadow-md rounded-lg w-full md:w-[582px] h-[132px] p-4">
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <Image
              src="/images/mark1.png"
              alt="mark"
              width={16}
              height={16}
              className="mr-2"
            />
            <h3 className="text-black font-semibold text-[16px]">Pick-Up</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {/* Location */}
            <div>
              <label htmlFor="pickUp-location" className="text-black text-sm font-bold">
                Location
              </label>
              <div
                id="pickUp-location"
                className="relative text-gray-500 text-sm rounded-md p-2 pr-6 cursor-pointer"
                onClick={() => toggleLocationDropdown("pickUp")}
                aria-label="Pick-Up location"
              >
                {pickUp.location}
                <FaChevronDown className="absolute top-3 right-2 text-gray-500" />
                {showLocationDropdown.pickUp && (
                  <div className="absolute z-10 bg-white shadow-lg rounded-md mt-2 w-full">
                    {countries.map((country, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelect("pickUp", "location", country)}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="pickUp-date" className="text-black text-sm font-bold">
                Date
              </label>
              <input
                id="pickUp-date"
                type="date"
                value={pickUp.date}
                min={new Date().toISOString().split("T")[0]} // Restrict to current or future dates
                onChange={(e) => handleSelect("pickUp", "date", e.target.value)}
                className="text-gray-500 text-sm rounded-md p-2 w-full cursor-pointer"
                aria-label="Pick-Up date"
              />
            </div>

            {/* Time */}
            <div>
              <label htmlFor="pickUp-time" className="text-black text-sm font-bold">
                Time
              </label>
              <input
                id="pickUp-time"
                type="time"
                value={pickUp.time}
                onChange={(e) => handleSelect("pickUp", "time", e.target.value)}
                className="text-gray-500 text-sm rounded-md p-2 w-full cursor-pointer"
                aria-label="Pick-Up time"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Swap Icon */}
      <div
        className="bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
        onClick={handleSwap}
        aria-label="Swap Pick-Up and Drop-Off"
      >
        <BsArrowDownUp />
      </div>

      {/* Drop-Off Section */}
      <div className="flex items-center bg-white shadow-md rounded-lg w-full md:w-[582px] h-[132px] p-4">
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <Image
              src="/images/mark.png"
              alt="mark"
              width={16}
              height={16}
              className="mr-2"
            />
            <h3 className="text-black font-semibold text-[16px]">Drop-Off</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {/* Location */}
            <div>
              <label htmlFor="dropOff-location" className="text-black text-sm font-bold">
                Location
              </label>
              <div
                id="dropOff-location"
                className="relative text-gray-500 text-sm rounded-md p-2 pr-6 cursor-pointer"
                onClick={() => toggleLocationDropdown("dropOff")}
                aria-label="Drop-Off location"
              >
                {dropOff.location}
                <FaChevronDown className="absolute top-3 right-2 text-gray-500" />
                {showLocationDropdown.dropOff && (
                  <div className="absolute z-10 bg-white shadow-lg rounded-md mt-2 w-full">
                    {countries.map((country, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelect("dropOff", "location", country)}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="dropOff-date" className="text-black text-sm font-bold">
                Date
              </label>
              <input
                id="dropOff-date"
                type="date"
                value={dropOff.date}
                min={new Date().toISOString().split("T")[0]} // Restrict to current or future dates
                onChange={(e) => handleSelect("dropOff", "date", e.target.value)}
                className="text-gray-500 text-sm rounded-md p-2 w-full cursor-pointer"
                aria-label="Drop-Off date"
              />
            </div>

            {/* Time */}
            <div>
              <label htmlFor="dropOff-time" className="text-black text-sm font-bold">
                Time
              </label>
              <input
                id="dropOff-time"
                type="time"
                value={dropOff.time}
                onChange={(e) => handleSelect("dropOff", "time", e.target.value)}
                className="text-gray-500 text-sm rounded-md p-2 w-full cursor-pointer"
                aria-label="Drop-Off time"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
