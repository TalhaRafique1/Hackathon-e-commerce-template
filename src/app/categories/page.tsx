import { client } from "../lib/sanity";
import FilterComponent from "../components/FilterComponent";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SimplifiedCar {
  _id: string;
  name: string;
  type: string;
  slug: {
    current: string;
  };
  image: {
    asset: {
      url: string;
    };
  };
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: string;
}

// Fetch data server-side
async function getData(): Promise<SimplifiedCar[]> {
  const query = `*[_type == "car"]{
    _id,
    name,
    type,
    slug,
    image{
      asset->{url}
    },
    fuelCapacity,
    transmission,
    seatingCapacity,
    pricePerDay,
  }`;

  return await client.fetch(query);
}

// Main Page Component
export default async function CategoriesPage() {
  const cars = await getData(); // Fetch data on the server side

  return (
    <div className="w-full flex">
      {/* Filter Sidebar */}
      <div className="hidden sm:flex w-[20%]">
        <FilterComponent onFilterChange={(filters) => console.log(filters)} />
      </div>

      {/* Car Listings */}
      <div className="w-full sm:w-[80%] bg-[#f6f7f9] p-4 sm:p-6 flex flex-col gap-10">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {cars.map((car: SimplifiedCar) => (
            <Card
              key={car._id}
              className="w-full max-w-[304px] mx-auto h-[388px] flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {car.name}
                  <Image src="/heart.png" alt="Favorite" width={20} height={20} />
                </CardTitle>
                <CardDescription>{car.type}</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col items-center justify-center gap-4">
                <Image
                  src={car.image.asset.url}
                  alt={car.name}
                  width={220}
                  height={68}
                  className="object-contain"
                />
                <div className="flex items-center justify-between gap-6 mt-4">
                  {/* Fuel Capacity */}
                  <div className="flex items-center gap-2">
                    <Image src="/gas-station.png" alt="Fuel" width={26} height={24} />
                    <h1 className="text-sm text-gray-700">{car.fuelCapacity}</h1>
                  </div>

                  {/* Transmission */}
                  <div className="flex items-center gap-2">
                    <Image src="/Caricon.png" alt="Transmission" width={26} height={24} />
                    <h1 className="text-sm text-gray-700">{car.transmission}</h1>
                  </div>

                  {/* Seating Capacity */}
                  <div className="flex items-center gap-2">
                    <Image src="/profile-2user.png" alt="Seating" width={26} height={24} />
                    <h1 className="text-sm text-gray-700">{car.seatingCapacity}</h1>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                  {car.pricePerDay}
                  <span className="text-sm text-gray-500">/day</span>
                </p>
                <Link href={`/categories/${car.slug.current}`}>
                  <button className="bg-[#3563e9] text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Rent Now
                  </button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}
