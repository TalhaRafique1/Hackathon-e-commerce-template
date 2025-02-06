'use client';

import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { client } from '@/sanity/lib/client';
import { fetchCarsQuery } from '@/sanity/queries';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Reviews from '@/components/Review';

type Car = {
  _id: string;
  name: string;
  brand: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: number;
  pricePerDay: number;
  originalPrice?: number;
  tags: string[];
  imageUrl: string;
  capacity?: string;
  favorite?: boolean;
};

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(100);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const fetchedCars: Car[] = await client.fetch(fetchCarsQuery);
        console.log('Fetched Cars:', fetchedCars); // Debugging
        const selectedCar = fetchedCars.find((car) => car._id === params.id);
        setCar(selectedCar || null);
        setCars(fetchedCars);
        setFilteredCars(fetchedCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCar();
  }, [params.id]);

  useEffect(() => {
    let filtered = cars;

    if (selectedType) {
      filtered = filtered.filter((car) => car.type === selectedType);
    }

    if (selectedCapacity) {
      const capacityMap: { [key: string]: number } = {
        '2 Person': 2,
        '4 Person': 4,
        '5 Person': 5,
        '6 Person': 6,
        '7 or More': 7,
      };
      filtered = filtered.filter((car) => car.seatingCapacity >= capacityMap[selectedCapacity!]);
    }

    filtered = filtered.filter((car) => car.pricePerDay <= price);

    setFilteredCars(filtered);
  }, [selectedType, selectedCapacity, price, cars]);

  if (!car) {
    return <div>Loading...</div>;
  }

  const types = [
    { name: 'Sport', count: 10 },
    { name: 'SUV', count: 12 },
    { name: 'Gasoline', count: 16 },
    { name: 'Sedan', count: 20 },
    { name: 'Hybrid', count: 14 },
    { name: 'Hatchback', count: 14 },
  ];

  const capacities = [
    { name: '2 Person', count: 10 },
    { name: '4 Person', count: 14 },
    { name: '5 Person', count: 8 },
    { name: '6 Person', count: 12 },
    { name: '7 or More', count: 16 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
        {/* Left Section: Aside Filter Panel */}
        <aside className="w-full lg:w-[360px] h-auto p-6 bg-white shadow-lg rounded-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Type</h2>
            <ul className="space-y-3">
              {types.map((type) => (
                <li
                  key={type.name}
                  className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedType(type.name)}
                >
                  <span className="flex items-center text-xl">{type.name}</span>
                  <span className="text-gray-400">{type.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Capacity</h2>
            <ul className="space-y-3">
              {capacities.map((capacity) => (
                <li
                  key={capacity.name}
                  className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedCapacity(capacity.name)}
                >
                  <span className="flex items-center text-xl">{capacity.name}</span>
                  <span className="text-gray-400">{capacity.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Price</h2>
            <div className="relative pt-2">
              <label htmlFor="priceRange" className="sr-only">
                Price Range
              </label>
              <input
                id="priceRange"
                type="range"
                min="0"
                max="500"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg"
                title="Price Range"
                placeholder="Select price range"
              />
              <div
                className="absolute top-0 left-0 h-2 rounded-lg bg-blue-500 pointer-events-none"
                style={{ width: `${(price / 500) * 100}%` }}
              ></div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Min: $0</span>
                <span>Max: ${price}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Middle Section: Blue Div */}
        <div className="flex-1 bg-blue-600 text-white rounded-lg p-6 sm:p-8 h-[350px] flex flex-col md:flex-row items-center justify-center">
          {/* Text Section */}
          <div className="w-full md:flex-1 mb-4 md:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Easy way to rent a car at a low price
            </h2>
            <p className="text-base sm:text-lg mb-4">
              Providing cheap car rental services and safe and comfortable facilities.
            </p>
            <button className="bg-white text-blue-600 px-4 sm:px-6 py-2 rounded-md font-semibold">
              Rental Car
            </button>
          </div>
          {/* Image Section */}
          <div className="w-full md:flex-1 flex justify-center items-center">
            <Image
              src={car.imageUrl}
              alt={car.name}
              width={200}
              height={200}
              className="w-full max-w-[180px] sm:max-w-[200px] object-contain shadow-lg rounded-md"
            />
          </div>
        </div>

        {/* Right Section: White Div */}
        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-4 sm:p-6 h-[400px]">
          {/* Favorite and Name */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">{car.name}</h3>
            <button>
              {car.favorite ? (
                <FaHeart className="w-6 h-6 text-red-500" />
              ) : (
                <FaRegHeart className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>

          {/* Reviewers and Stars */}
          <p className="text-sm text-gray-600 mb-1">440+ Reviewers</p>
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="w-5 h-5 text-yellow-400" />
            ))}
          </div>

          {/* Car Details */}
          <p className="text-gray-600 mb-4">
            NISMO has become the embodiment of {car.name}s outstanding performance, inspired by the most unforgiving proving ground, the &quot;race track.&quot;
          </p>
          <ul className="space-y-2 text-sm sm:text-base">
            {/* Type and Capacity */}
            <li className="flex justify-between">
              <div className="flex w-full justify-between">
                <strong>Type:</strong> <span>{car.type}</span>
                <strong className="ml-14">Capacity:</strong> <span>{car.capacity || 'N/A'}</span>
              </div>
            </li>
            {/* Seats and Transmission */}
            <li className="flex justify-between">
              <div className="flex w-full justify-between">
                <strong>Seats:</strong> <span>{car.seatingCapacity || 'N/A'}</span>
                <strong className="ml-16">Transmission:</strong> <span>{car.transmission}</span>
              </div>
            </li>
          </ul>

          {/* Price and Rent Button */}
          <div className="mt-4">
            <span className="text-lg sm:text-xl font-bold">${car.pricePerDay.toFixed(2)}</span>{" "}
            <Link href={`/dashboard/${params.id}`} passHref>
              <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md font-semibold ml-2 sm:ml-4">
                Rent Now
              </button>
            </Link>
          </div>
          <span className="line-through text-gray-400">${car.originalPrice || 'N/A'}</span>
        </div>
      </div>

      {/* Three Small Images Below the Blue Div */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 mt-8">
        {filteredCars.map((carItem) => (
          <div key={carItem._id} className="w-full sm:w-1/3 md:w-1/4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image
                src={carItem.imageUrl}
                alt={carItem.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold">{carItem.name}</h4>
                <p className="text-gray-500">{carItem.type}</p>
                <p className="text-gray-700 mt-2">${carItem.pricePerDay}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Reviews />
      </div>
    </div>
  );
}
