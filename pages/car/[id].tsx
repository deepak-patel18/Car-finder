import { useRouter } from 'next/router';
import { carData } from '../../data/cars';
import Link from 'next/link';

export default function CarDetails() {
  const router = useRouter();
  const { id } = router.query;
  const car = carData.find(car => car.id === Number(id));

  if (!car) return <p className="p-4">Car not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Search</Link>
      <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
      <img src={car.image} className="w-full max-w-md mb-6 rounded shadow" alt={car.name} />
      <div className="bg-white rounded shadow p-4 space-y-3">
        <p><strong>Brand:</strong> {car.brand}</p>
        <p><strong>Fuel Type:</strong> {car.fuelType}</p>
        <p><strong>Price:</strong> ₹ {car.price.toLocaleString()}</p>
        <p><strong>Seating:</strong> {car.seating} Seater</p>
      </div>
    </div>
  );
}