// components/CarDetails.tsx
"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Car {
  _id: string;
  name: string;
  type: string;
  image: string;
  fuelCapacity: number;
  transmission: string;
  seatingCapacity: number;
  pricePerDay: number;
  brand: string;
  originalPrice: number;
  tags: string[];
  slug: {
    current: string;
  };
}

export default function CarDetails({ car }: { car: Car }) {
  if (!car) {
    return <div className="text-center text-xl">Car not found</div>;
  }

  return (
    <div className="w-full flex">
      <div className="sec w-full bg-[#f6f7f9] p-4 sm:p-6 flex flex-col gap-10">
        {/* Car Details Section */}
        <section className="w-full flex flex-col md:flex-row gap-5 items-center justify-around">
          {/* Image Section */}
          <div className="first flex flex-col gap-4 w-full lg:max-w-[470px]">
            <Image
              src={car.image}
              alt={car.name}
              width={492}
              height={360}
              className="w-full h-[360px] rounded-lg object-cover"
              priority
            />
          </div>

          {/* Details Card */}
          <div className="flex flex-col w-full lg:max-w-[492px] bg-white justify-between rounded-xl shadow-md">
            <Card>
              <CardHeader>
                <CardTitle className="w-full flex items-center justify-between">
                  {car.name}
                  <Image
                    src="/heart.png"
                    alt="Favorite"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                </CardTitle>
                <CardDescription>{car.type}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 mt-8">
                <div className="car-details w-full flex flex-col gap-6">
                  {/* Car Info */}
                  <div className="flex items-center justify-between gap-6">
                    {/* Fuel Capacity */}
                    <div className="flex flex-col items-center gap-2">
                      <Image
                        src="/gas-station.png"
                        alt="Fuel Capacity"
                        width={32}
                        height={32}
                      />
                      <h1 className="text-lg font-medium text-gray-700">
                        {car.fuelCapacity}L
                      </h1>
                      <p className="text-sm text-gray-500">Fuel Capacity</p>
                    </div>
                    {/* Transmission */}
                    <div className="flex flex-col items-center gap-2">
                      <Image
                        src="/Caricon.png"
                        alt="Transmission"
                        width={32}
                        height={32}
                      />
                      <h1 className="text-lg font-medium text-gray-700">
                        {car.transmission}
                      </h1>
                      <p className="text-sm text-gray-500">Transmission</p>
                    </div>
                    {/* Seating Capacity */}
                    <div className="flex flex-col items-center gap-2">
                      <Image
                        src="/profile-2user.png"
                        alt="Seating Capacity"
                        width={32}
                        height={32}
                      />
                      <h1 className="text-lg font-medium text-gray-700">
                        {car.seatingCapacity}
                      </h1>
                      <p className="text-sm text-gray-500">Seating Capacity</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
