import { NextApiRequest, NextApiResponse } from 'next';
import { carData } from '../../data/cars';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { brand, fuelType, price, seating } = req.query;
  let filtered = carData;

  if (brand && brand !== '') {
    filtered = filtered.filter(car => car.brand.toLowerCase() === String(brand).toLowerCase());
  }

  if (fuelType && fuelType !== '') {
    filtered = filtered.filter(car => car.fuelType.toLowerCase() === String(fuelType).toLowerCase());
  }

  if (price && price !== '0') {
    const priceNum = Number(price);
    if (!isNaN(priceNum)) {
      filtered = filtered.filter(car => car.price <= priceNum);
    }
  }

  if (seating && seating !== '0') {
    const seatingNum = Number(seating);
    if (!isNaN(seatingNum)) {
      filtered = filtered.filter(car => car.seating === seatingNum);
    }
  }

  console.log('🔍 Query:', req.query);
  console.log(`✅ Sending cars: ${filtered.length}`);

  res.status(200).json(filtered);
}