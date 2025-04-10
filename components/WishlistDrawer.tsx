import React, { useEffect, useState } from 'react';

type WishlistDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ open, onClose }) => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    const parsed = stored ? JSON.parse(stored) : [];
    setWishlist(Array.isArray(parsed) ? parsed : []);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white dark:bg-gray-800 w-96 p-4 shadow-lg h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Wishlist</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:underline text-sm"
          >
            Close
          </button>
        </div>
        {wishlist.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No cars in wishlist</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {wishlist.map((car, index) => (
              <div
                key={index}
                className="rounded-xl shadow-md bg-white dark:bg-gray-900 overflow-hidden"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{car.name}</h3>
                  <p className="text-sm text-gray-500">{car.brand}</p>
                  <p className="text-sm font-medium mt-1">${car.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
