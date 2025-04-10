import { useEffect, useState } from 'react';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/wishlist';
import Link from 'next/link';

export default function CarCard({ car }: { car: any }) {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    setInWishlist(isInWishlist(car.id));
  }, [car.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car.id);
    }
    setInWishlist(!inWishlist);
  };

  return (
    <Link href={`/car/${car.id}`} className="block">
      <div className="border rounded-xl p-4 shadow-md hover:shadow-2xl transition relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-md">
        <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-xl mb-3" />
        <div className="flex-grow">
          <h3 className="text-lg font-bold hover:underline mb-1">{car.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {car.brand} • {car.fuelType} • {car.seating} Seater
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-semibold mt-2">
            ₹ {car.price.toLocaleString()}
          </p>
        </div>
        <button
          onClick={toggleWishlist}
          className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
            inWishlist
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
          }`}
        >
          {inWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
        </button>
      </div>
    </Link>
  );
}
