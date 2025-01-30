import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

interface Car {
  id: number;
  make: string;
  model: string;
  registrationNumber: string;
  registrationExpiryDate: string;
}

export default function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [make, setMake] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/cars${make ? `?make=${make}` : ''}`);
        setCars(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch cars');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [make]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cars-list">
      <h1>Cars List</h1>
      <div className="filter-container">
        <input 
          type="text" 
          placeholder="Filter by make..." 
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="filter-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Registration</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.registrationNumber}</td>
              <td>{new Date(car.registrationExpiryDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}