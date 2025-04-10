import { useEffect, useState } from 'react';
import Head from 'next/head';
import CarCard from '../components/CarCard';
import WishlistDrawer from '../components/WishlistDrawer';
import DarkModeToggle from '../components/DarkModeToggle';

// ✅ Car type definition to fix TypeScript build error
type Car = {
  id: string | number;
  brand: string;
  fuelType: string;
  price: number;
  seating: number;
  image: string;
  name: string;
};

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [brand, setBrand] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [wishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      const query = new URLSearchParams({
        brand,
        fuelType,
        price: maxPrice || '0',
        seating: '0',
        page: '1',
      });

      const res = await fetch(`/api/cars?${query.toString()}`);
      const data = await res.json();
      setCars(data);
    };
    fetchCars();
  }, [brand, fuelType, maxPrice]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <Head>
        <title>Car Finder</title>
      </Head>

      <main className="p-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
          <h1 className="text-3xl font-bold text-center sm:text-left">🚗 Car Finder</h1>
          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <button
              onClick={() => setWishlistOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="">All Brands</option>
            <option value="Tesla">Tesla</option>
            <option value="Toyota">Toyota</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Tata">Tata</option>
          </select>

          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Car Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.length > 0 ? (
            cars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No cars found matching the filters.
            </p>
          )}
        </div>

        {/* Wishlist Drawer */}
        <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      </main>
    </div>
  );
}
