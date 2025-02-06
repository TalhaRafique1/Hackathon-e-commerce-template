'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import {
  FaTachometerAlt,
  FaCar,
  FaChartBar,
  FaWallet,
  FaInbox,
  FaCalendarAlt,
  FaCog,
  FaQuestionCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import Link from "next/link";

interface Car {
  _id: string;
  name: string;
  pricePerDay: number;
  imageUrl: string;
  type: string;
  transmission: string;
  seatingCapacity: number;
}

export default function DashboardPage() {
  // Access route parameters using useParams hook
  const params = useParams();
  const { carId } = params as { carId: string };

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const query = `*[_type == "car" && _id == $carId][0] {
          _id,
          name,
          pricePerDay,
          "imageUrl": image.asset->url,
          type,
          transmission,
          seatingCapacity
        }`;

        const result = await client.fetch(query, { carId });
        setCar(result);
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      fetchCar();
    }
  }, [carId]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Car not found
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-full lg:w-64 p-6 flex flex-col justify-between ${
          theme === "dark" ? "bg-gray-800" : "bg-white shadow-lg"
        }`}
      >
        <nav>
          <h2
            className={`text-2xl font-semibold mb-6 ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Main Menu
          </h2>
          <ul className="space-y-4">
            {[
              { icon: <FaTachometerAlt />, text: "Dashboard", href: "/" },
              { icon: <FaCar />, text: "Car Rent", href: "/carrent" },
              { icon: <FaChartBar />, text: "Insight", href: "/analytics" },
              { icon: <FaWallet />, text: "Reimburse", href: "/reimburse" },
              { icon: <FaInbox />, text: "Inbox", href: "/chatbot" },
              { icon: <FaCalendarAlt />, text: "Calendar", href: "/calendar" },
            ].map((item, index) => (
              <li
                key={index}
                className={`flex items-center space-x-2 text-lg p-3 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Link href={item.href}>
                  <span className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3
            className={`text-lg font-semibold mt-4 mb-4 ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Preferences
          </h3>
          <ul className="space-y-2">
            {[
              { icon: <FaCog />, text: "Settings", href: "/setting" },
              { icon: <FaQuestionCircle />, text: "Help & Center", href: "/faq" },
              {
                icon: theme === "dark" ? <FaSun /> : <FaMoon />,
                text: theme === "dark" ? "Light Mode" : "Dark Mode",
                onClick: toggleTheme,
              },
            ].map((item, index) => (
              <li
                key={index}
                className={`flex items-center space-x-2 text-lg p-3 rounded-lg transition-colors cursor-pointer ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item.href ? (
                  <Link href={item.href}>
                    <span className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.text}</span>
                    </span>
                  </Link>
                ) : (
                  <div onClick={item.onClick} className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <button
            className={`mt-6 text-lg w-full p-3 rounded-lg transition-colors ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {/* Details Rental */}
          <div
            className={`col-span-1 lg:col-span-2 rounded-lg p-6 ${
              theme === "dark" ? "bg-gray-800 shadow-lg" : "bg-white shadow-md"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Details Rental</h2>

            <div className="relative mb-6 w-full h-64">
              <Image
                src="/images/Maps.png"
                alt="Map"
                fill
                className={`object-cover rounded-lg ${
                  theme === "dark" ? "filter brightness-90" : ""
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-24 h-16 flex-shrink-0">
                <Image
                  src={car.imageUrl}
                  alt="Car Thumbnail"
                  fill
                  className="object-cover rounded"
                  sizes="100px"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p
                  className={`capitalize ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {car.type.toLowerCase()}
                </p>
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  #{car._id.slice(-4)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Total Rental Price
              </p>
              <p className="text-xl font-bold">${Number(car.pricePerDay).toFixed(2)}</p>
            </div>

            <div
              className={`mt-6 grid grid-cols-2 gap-4 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <div>
                <span>Transmission</span>
                <p className="capitalize">{car.transmission.toLowerCase()}</p>
              </div>
              <div>
                <span>Capacity</span>
                <p>{car.seatingCapacity} Persons</p>
              </div>
              <Link
                href={`/payment/${car._id}`}
                className="mt-6 block w-full sm:w-auto md:w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Rent Now
              </Link>
              <Link
                href="https://book.stripe.com/test_3cs5lNa6o4hwd6E000"
                className="mt-6 block w-full sm:w-auto md:w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                CheckOut
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div
            className={`space-y-6 rounded-lg p-6 ${
              theme === "dark" ? "bg-gray-800 shadow-lg" : "bg-white shadow-md"
            }`}
          >
            {/* Top 5 Car Rental */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Top 5 Car Rentals</h2>
              <div className="flex flex-col sm:flex-row items-center space-x-4 mb-4">
                <div className="relative">
                  <Image
                    src="/images/Chart.png"
                    alt="Donut Chart"
                    width={150}
                    height={150}
                    className={theme === "dark" ? "filter invert" : ""}
                  />
                </div>
                <ul
                  className={`space-y-2 mt-4 sm:mt-0 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {[
                    { type: "Sport Car", value: "17,439" },
                    { type: "SUV", value: "9,478" },
                    { type: "Coupe", value: "18,197" },
                    { type: "Hatchback", value: "12,510" },
                    { type: "MPV", value: "14,406" },
                  ].map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        <b>{item.type}</b>
                      </span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
              <ul
                className={`space-y-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {[
                  { name: "Nissan GT-R", price: "$80.00" },
                  { name: "Koenigsegg", price: "$99.00" },
                  { name: "Rolls-Royce", price: "$96.00" },
                  { name: "CR-V", price: "$80.00" },
                ].map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-lg font-semibold">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
