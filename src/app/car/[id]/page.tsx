'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { client } from '@/sanity/lib/client';
import { fetchCarsQuery } from '@/sanity/queries';
import Image from 'next/image';
import Link from 'next/link';
import Reviews from '@/components/Review';

type Car = {
  _id: string;
  name: string;
  brand: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: number;
  pricePerDay: number | string;
  originalPrice?: number | string;
  tags: string[];
  imageUrl: string;
  capacity?: string;
  favorite?: boolean;
};

export default function CarDetailsPage() {
  // Access route parameters using the useParams hook
  const params = useParams();
  const { id } = params as { id: string };

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
        const selectedCar = fetchedCars.find((car) => car._id === id);
        setCar(selectedCar || null);
        setCars(fetchedCars);
        setFilteredCars(fetchedCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    if (id) {
      fetchCar();
    }
  }, [id]);

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
      filtered = filtered.filter(
        (car) => car.seatingCapacity >= capacityMap[selectedCapacity!]
      );
    }

    filtered = filtered.filter((car) => Number(car.pricePerDay) <= price);

    setFilteredCars(filtered);
  }, [selectedType, selectedCapacity, price, cars]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">
        Loading...
      </div>
    );
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
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Section: Filter Panel */}
        <aside className="w-full lg:w-80 bg-white p-6 rounded-xl shadow-md">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Type</h2>
            <ul className="space-y-2">
              {types.map((type) => (
                <li
                  key={type.name}
                  className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedType === type.name
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedType(type.name)}
                >
                  <span className="text-lg">{type.name}</span>
                  <span className="text-sm text-gray-500">{type.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Capacity</h2>
            <ul className="space-y-2">
              {capacities.map((capacity) => (
                <li
                  key={capacity.name}
                  className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedCapacity === capacity.name
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCapacity(capacity.name)}
                >
                  <span className="text-lg">{capacity.name}</span>
                  <span className="text-sm text-gray-500">{capacity.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Price</h2>
            <div className="relative">
              <label htmlFor="priceRange" className="sr-only">Price Range</label>
              <input
                id="priceRange"
                type="range"
                min="0"
                max="500"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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

        {/* Middle Section: Highlighted Car */}
        <section className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Rent {car.name} Now!
            </h2>
            <p className="text-lg mb-6">
              Enjoy the ultimate driving experience with affordable rates and
              premium comfort.
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold transition-all hover:shadow-lg">
              Rental Car
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={car.imageUrl}
              alt={car.name}
              width={250}
              height={250}
              className="object-contain rounded-lg shadow-xl"
            />
          </div>
        </section>

        {/* Right Section: Car Details */}
        <aside className="w-full lg:w-96 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{car.name}</h3>
            <button>
              {car.favorite ? (
                <FaHeart className="w-7 h-7 text-red-500" />
              ) : (
                <FaRegHeart className="w-7 h-7 text-gray-400 hover:text-red-500 transition-colors" />
              )}
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-2">440+ Reviewers</p>
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="w-6 h-6 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-600 mb-4">
            NISMO has become the embodiment of {car.name}&apos;s outstanding
            performance, inspired by the most unforgiving proving ground –
            the race track.
          </p>
          <ul className="space-y-3 mb-6 text-gray-700">
            <li className="flex justify-between">
              <span className="font-semibold">Type:</span>
              <span>{car.type}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Capacity:</span>
              <span>{car.capacity || 'N/A'}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Seats:</span>
              <span>{car.seatingCapacity || 'N/A'}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Transmission:</span>
              <span>{car.transmission}</span>
            </li>
          </ul>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-gray-800">
              ${Number(car.pricePerDay).toFixed(2)}
            </span>
            <Link href={`/dashboard/${id}`} passHref>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-all hover:shadow-lg">
                Rent Now
              </button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 line-through">
            ${car.originalPrice ? Number(car.originalPrice).toFixed(2) : 'N/A'}
          </p>
        </aside>
      </div>

      {/* Filtered Cars Section */}
      <section className="max-w-7xl mx-auto mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          More Cars for You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCars.map((carItem) => (
            <div
              key={carItem._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Image
                src={carItem.imageUrl}
                alt={carItem.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {carItem.name}
                </h4>
                <p className="text-gray-500">{carItem.type}</p>
                <p className="text-gray-700 mt-2 font-semibold">
                  ${Number(carItem.pricePerDay).toFixed(2)}
                </p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full font-semibold transition-all hover:shadow-lg">
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <Reviews />
      </div>
    </div>
  );
}
