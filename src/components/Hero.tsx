import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
      {/* Card 1 */}
      <div
        className="text-white w-full md:w-[640px] h-[360px] p-6 rounded-lg flex flex-col justify-between"
        style={{
          backgroundImage: "url('/images/bg1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-opacity-50">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            The Best Platform for Car Rental
          </h2>
          <p className="text-sm sm:text-base mt-2">
            Ease of doing car rental safely and reliably. Of course at a low
            price.
          </p>
          <button className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">
            Rental Car
          </button>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/car1.png"
            alt="Car"
            width={406}
            height={116}
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="text-white w-full md:w-[640px] h-[360px] p-6 rounded-lg  flex-col justify-between hidden md:flex"
        style={{
          backgroundImage: "url('/images/bg2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-opacity-50">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Easy way to rent a car at a low price
          </h2>
          <p className="text-sm sm:text-base mt-2">
            Providing cheap car rental services and safe and comfortable
            facilities.
          </p>
          <button className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">
            Rental Car
          </button>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/car2.png"
            alt="Car"
            width={406}
            height={116}
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}