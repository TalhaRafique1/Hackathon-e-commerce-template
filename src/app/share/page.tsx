
'use client';

import { useState } from 'react';
import { FaFacebook, FaHeart, FaRegHeart, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { GiCarDoor, GiGasPump } from "react-icons/gi";
import { BiCog } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import Image from "next/image";

type Car = {
  id: string;
  name: string;
  brand: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: number;
  pricePerDay: number;
  imageUrl: string;
};

const CarSharePage = () => {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [sharedMessage, setSharedMessage] = useState<string>('');

  const cars: Car[] = [
    {
      id: '1',
      name: 'Tesla Model S',
      brand: 'Tesla',
      type: 'Electric',
      fuelCapacity: '100 kWh',
      transmission: 'Automatic',
      seatingCapacity: 5,
      pricePerDay: 250,
      imageUrl: '/images/car3.png',
    },
    {
      id: '2',
      name: 'Toyota Camry',
      brand: 'Toyota',
      type: 'Sedan',
      fuelCapacity: '50L',
      transmission: 'Automatic',
      seatingCapacity: 5,
      pricePerDay: 120,
      imageUrl: '/images/car5.png',
    },
    {
      id: '3',
      name: 'Ford Mustang',
      brand: 'Ford',
      type: 'Sports',
      fuelCapacity: '60L',
      transmission: 'Manual',
      seatingCapacity: 4,
      pricePerDay: 180,
      imageUrl: '/images/car6.png',
    },
  ];

  const handleSelectCar = (car: Car) => {
    setSelectedCars((prev) => {
      if (prev.some((item) => item.id === car.id)) {
        return prev.filter((item) => item.id !== car.id); // Deselect car
      }
      return [...prev, car]; // Select car
    });
  };

  const handleShare = () => {
    if (selectedCars.length > 0 && selectedPlatform) {
      setSharedMessage(`Your selected cars have been shared on ${selectedPlatform}!`);
    } else {
      setSharedMessage('Please select at least one car and a platform to share.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Share Your Favorite Cars</h1>
        
        </div>

        {/* Cars Section */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div
              key={car.id}
              className={`bg-white rounded-xl shadow-lg p-6 transition-all transform hover:scale-105 ${selectedCars.some(item => item.id === car.id) ? 'border-4 border-indigo-500' : 'border-2 border-gray-100'}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">{car.name}</h3>
                <button
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => handleSelectCar(car)}
                >
                  {selectedCars.some(item => item.id === car.id) ? (
                    <FaHeart className="w-6 h-6 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Car Image */}
              <div className="mt-6 mb-6 flex justify-center">
                <Image
                  src={car.imageUrl}
                  alt={car.name}
                  width={250}
                  height={150}
                  className="w-auto h-auto object-contain"
                />
              </div>

              {/* Car Details */}
              <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
                <div className="flex items-center space-x-2">
                  <GiGasPump className="w-5 h-5 text-gray-500" />
                  <p>{car.fuelCapacity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <BiCog className="w-5 h-5 text-gray-500" />
                  <p>{car.transmission}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="w-5 h-5 text-gray-500" />
                  <p>{car.seatingCapacity} seats</p>
                </div>
                <div className="flex items-center space-x-2">
                  <GiCarDoor className="w-5 h-5 text-gray-500" />
                  <p>{car.type}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6">
                <p className="text-2xl font-bold text-gray-900">
                  ${car.pricePerDay}
                  <span className="text-gray-400 text-sm"> /day</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Select Platform Dropdown */}
        {selectedCars.length > 0 && (
          <div className="mt-12 max-w-md mx-auto">
            <label htmlFor="platform" className="block text-lg font-semibold text-gray-900 mb-3">
              Choose a platform to share:
            </label>
            <select
              id="platform"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="">Select a platform</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
          </div>
        )}

        {/* Share Button */}
        <div className="flex justify-center mt-12">
          <button
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            onClick={handleShare}
          >
            Share Selected Cars
          </button>
        </div>

        {/* Share Confirmation Message */}
        {sharedMessage && (
          <div className="mt-8 text-center text-lg font-semibold text-indigo-600">
            {sharedMessage}
          </div>
        )}

      
      </div>
    </div>
  );
};

export default CarSharePage;