'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from '@/sanity/lib/client';
import Link from "next/link";

interface Car {
  _id: string;
  name: string;
  pricePerDay: number;
  imageUrl: string;
  seatingCapacity: number;
  transmission: string;
  type: string;
  originalPrice?: number;
}

interface PageProps {
  params: {
    carId: string;
  };
}

export default function PaymentPage({ params }: PageProps) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const query = `*[_type == "car" && _id == $carId][0] {
          _id,
          name,
          pricePerDay,
          "imageUrl": image.asset->url,
          seatingCapacity,
          transmission,
          type,
          originalPrice
        }`;
        
        const { carId } = params;
        const result = await client.fetch(query, { carId });
        console.log("Fetched Car Data:", result)
        setCar(result);
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [params]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div>
          {/* Billing Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-1">Billing Info</h2>
            <p className="text-gray-400 mb-6">Please Enter Your Billing info</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  title="Enter your full name"
                  className="w-full p-2 border rounded-md text-left"
                  aria-label="Name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Phone number"
                  title="Enter your phone number"
                  className="w-full p-2 border rounded-md text-left"
                  aria-label="Phone number"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  title="Enter your address"
                  className="w-full p-2 border rounded-md text-left"
                  aria-label="Address"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">Town / City</label>
                <input
                  id="city"
                  type="text"
                  placeholder="Town / City"
                  title="Enter your town or city"
                  className="w-full p-2 border rounded-md text-left"
                  aria-label="Town / City"
                />
              </div>
            </div>
          </div>

          {/* Rental Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold">Rental Info</h2>
            <p className="text-gray-400 mb-6">Please Enter Your Rental Date</p>
            <div className="space-y-4">
              <h3 className="font-medium mb-2">Pick-Up</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickUpCity" className="block text-sm font-medium mb-1">City</label>
                  <input
                    id="pickUpCity"
                    type="text"
                    placeholder="Select your city"
                    title="Enter pick-up city"
                    className="w-full p-2 border rounded-md text-left"
                    aria-label="Pick-Up City"
                  />
                </div>
                <div>
                  <label htmlFor="pickUpDate" className="block text-sm font-medium mb-1">Date</label>
                  <input
                    id="pickUpDate"
                    type="date"
                    title="Select pick-up date"
                    className="w-full p-2 border rounded-md text-left"
                    aria-label="Pick-Up Date"
                  />
                </div>
                <div>
                  <label htmlFor="pickUpTime" className="block text-sm font-medium mb-1">Time</label>
                  <input
                    id="pickUpTime"
                    type="time"
                    title="Select pick-up time"
                    className="w-full p-2 border rounded-md text-left"
                    aria-label="Pick-Up Time"
                  />
                </div>
              </div>

              <h3 className="font-medium mb-2">Drop-Off</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dropOffCity" className="block text-sm font-medium mb-1">City</label>
                  <input
                    id="dropOffCity"
                    type="text"
                    placeholder="Select your city"
                    title="Enter drop-off city"
                    className="w-full p-2 border rounded-md text-left"
                    aria-label="Drop-Off City"
                  />
                </div>
                <div>
                  <label htmlFor="dropOffDate" className="block text-sm font-medium mb-1">Date</label>
                  <input
                    id="dropOffDate"
                    type="date"
                    title="Select drop-off date"
                    className="w-full p-2 border rounded-md text-left"
                    aria-label="Drop-Off Date"
                  />
                </div>
                <div>
                  <label htmlFor="dropOffTime" className="block text-sm font-medium mb-1">Time</label>
                  <input
                    id="dropOffTime"
                    type="time"
                    title="Select drop-off time"
                    className="w-full p-2 border rounded-md text-left"
                    aria-label="Drop-Off Time"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <p className="text-gray-400 mb-6">Please Enter Your payment method</p>
            <div className="space-y-4">
              {/* Credit Card Option */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" id="creditCard" />
                  <label htmlFor="creditCard">Credit Card</label>
                </div>
                <Image
                  src="/images/Visa.png" // Add your credit card image here
                  alt="Credit Card"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>

              {/* Form fields layout */}
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="Card Number"
                      title="Enter your card number"
                      className="w-full p-2 border rounded-md text-left"
                      aria-label="Card Number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="expirationDate" className="block text-sm font-medium mb-1">Expiration Date</label>
                    <input
                      id="expirationDate"
                      type="text"
                      placeholder="MM/YY"
                      title="Enter your card expiration date"
                      className="w-full p-2 border rounded-md text-left"
                      aria-label="Expiration Date"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="cardHolder" className="block text-sm font-medium mb-1">Card Holder</label>
                    <input
                      id="cardHolder"
                      type="text"
                      placeholder="Card Holder"
                      title="Enter the cardholder's name"
                      className="w-full p-2 border rounded-md text-left"
                      aria-label="Card Holder"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                    <input
                      id="cvc"
                      type="text"
                      placeholder="CVC"
                      title="Enter your card CVC"
                      className="w-full p-2 border rounded-md text-left"
                      aria-label="CVC"
                    />
                  </div>
                </div>
              </div>

              {/* PayPal Option */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" id="payPal" />
                  <label htmlFor="payPal">PayPal</label>
                </div>
                <Image
                  src="/images/PayPal (1).png" // Add your PayPal image here
                  alt="PayPal"
                  width={30}
                  height={30}
                  className="object-cover"
                />
              </div>

              {/* Bitcoin Option */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" id="bitcoin" />
                  <label htmlFor="bitcoin">Bitcoin</label>
                </div>
                <Image
                  src="/images/Bitcoin (1).png" // Add your Bitcoin image here
                  alt="Bitcoin"
                  width={30}
                  height={30}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Confirmation Section */}
          <h2 className="text-2xl font-bold ">Confirmation</h2>
          <div className="w-full flex items-center justify-between mb-4">
            <h1 className="text-gray-400">We are getting to the end. Just a few clicks and your rental is ready</h1>
            <h1>Step 4 of 4</h1>
          </div>

          {/* Small Paragraphs with Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" id="marketing" />
              <label htmlFor="marketing">I agree with sending marketing and newsletter emails. No spam, promised!</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" id="terms" />
              <label htmlFor="terms">I agree with our terms and conditions and privacy policy.</label>
            </div>
          </div>

          {/* Rent Now Button */}
          <Link
            href="/" // Correct dynamic route for carId
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center w-full inline-block"
          >
            Rent now
          </Link>
        </div>

        {/* Right Section */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Rental Summary</h2>
            <p className="text-gray-400 mb-6">
              Prices may change depending on the length of the rental and the <br />
              price of your rental car.
            </p>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
              </div>
            ) : car ? (
              <div className="flex flex-col md:flex-row items-center mb-6">
                <div className="w-full md:w-72 h-48 relative mb-4 md:mb-0 md:mr-6">
                  {!imageError && car.imageUrl ? (
                    <Image
                      src={car.imageUrl}
                      alt={car.name}
                      fill
                      className="object-cover rounded-lg"
                      onError={() => setImageError(true)}
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Image not available</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold">{car.name}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    <span className="text-gray-500 ml-2">440+ Reviews</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-red-500">Car not found</div>
            )}

            {/* Price Section */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <span>Subtotal:</span>
                <span>${car?.pricePerDay || 0}.00</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Tax:</span>
                <span>$0.00</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${car?.pricePerDay || 0}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}