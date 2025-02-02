// src/app/categories/[slug]/page.tsx

import { client } from "@/app/lib/sanity"; // Import your sanity client
import CarDetails from "@/app/components/CarDetails"; // Import the CarDetails component

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

interface Params {
  slug: string;
}

async function fetchCarData(slug: string): Promise<Car | null> {
  const query = `*[_type == "car" && slug.current == $slug][0]`;
  const car = await client.fetch(query, { slug });
  return car || null; // Return car or null if not found
}

export default async function CarDetailsPage({ params }: { params: Params }) {
  const { slug } = params; // Get the slug from the URL params
  const car = await fetchCarData(slug); // Fetch car data from Sanity

  if (!car) {
    return <div className="text-center text-xl">Car not found</div>; // Handle case where the car is not found
  }

  return <CarDetails car={car} />; // Render the CarDetails component with the car data
}
