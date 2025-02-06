'use client';

import { useState } from 'react';

type Car = {
  id: string;
  name: string;
  type: string;
  capacity: number;
  pricePerDay: number;
};

export default function CarRentPage() {
  // Sample car data
  const [cars] = useState<Car[]>([
    {
      id: '1',
      name: 'Toyota Camry',
      type: 'Sedan',
      capacity: 5,
      pricePerDay: 50,
    },
    {
      id: '2',
      name: 'Honda CR-V',
      type: 'SUV',
      capacity: 5,
      pricePerDay: 70,
    },
    {
      id: '3',
      name: 'Ford Mustang',
      type: 'Sport',
      capacity: 4,
      pricePerDay: 120,
    },
    {
      id: '4',
      name: 'Tesla Model 3',
      type: 'Electric',
      capacity: 5,
      pricePerDay: 100,
    },
  ]);

  // State for filters
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(200);

  // Filter cars based on selected filters
  const filteredCars = cars.filter((car) => {
    const typeMatch = selectedType ? car.type === selectedType : true;
    const capacityMatch = selectedCapacity
      ? car.capacity >= parseInt(selectedCapacity)
      : true;
    const priceMatch = car.pricePerDay <= priceRange;
    return typeMatch && capacityMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Rent a Car</h1>

        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label htmlFor="carType" className="block text-sm font-medium mb-2">
                Type
              </label>
              <select
                id="carType"
                value={selectedType || ''}
                onChange={(e) =>
                  setSelectedType(e.target.value === '' ? null : e.target.value)
                }
                className="w-full p-2 border rounded-md"
                aria-label="Select car type"
              >
                <option value="">All Types</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Sport">Sport</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Capacity Filter */}
            <div>
              <label htmlFor="carCapacity" className="block text-sm font-medium mb-2">
                Capacity
              </label>
              <select
                id="carCapacity"
                value={selectedCapacity || ''}
                onChange={(e) =>
                  setSelectedCapacity(
                    e.target.value === '' ? null : e.target.value
                  )
                }
                className="w-full p-2 border rounded-md"
                aria-label="Select car capacity"
              >
                <option value="">All Capacities</option>
                <option value="2">2 Person</option>
                <option value="4">4 Person</option>
                <option value="5">5 Person</option>
                <option value="7">7 or More</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium mb-2">
                Price Range (up to ${priceRange})
              </label>
              <input
                id="priceRange"
                type="range"
                min="0"
                max="200"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
                aria-label={`Select price range up to $${priceRange}`}
                placeholder={`${priceRange}`}
              />
            </div>
          </div>
        </div>

        {/* Car Listing Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => {
            // Calculate weekly price (10% discount)
            const weeklyPrice = (car.pricePerDay * 7 * 0.9).toFixed(2);

            return (
              <div
                key={car.id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4"
              >
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <p className="text-gray-600 mb-2">
                  Type: {car.type} | Capacity: {car.capacity} Person
                </p>

                {/* Rental Packages */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span>Daily Rental</span>
                    <span className="font-bold">${car.pricePerDay} / day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Weekly Rental</span>
                    <span className="font-bold">${weeklyPrice} / week</span>
                  </div>
                </div>

                {/* Rent Now Button */}
                <button
                  onClick={() =>
                    alert(`You selected ${car.name} for rental.`)
                  }
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Rent Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
