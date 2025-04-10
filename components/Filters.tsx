import React from 'react';

const brands = ['Toyota', 'Honda', 'Ford', 'Hyundai'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

export default function Filters({ filters, setFilters }: { filters: any, setFilters: any }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: value, page: 1 }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
      <select name="brand" value={filters.brand} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Brands</option>
        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
      </select>

      <select name="fuelType" value={filters.fuelType} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Fuel Types</option>
        {fuelTypes.map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
      </select>

      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        placeholder="Min Price"
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        placeholder="Max Price"
        onChange={handleChange}
        className="border p-2 rounded"
      />
    </div>
  );
}
