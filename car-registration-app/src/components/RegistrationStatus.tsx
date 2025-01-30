import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';
import './styles.css';

interface RegistrationStatus {
  [key: string]: boolean;
}

export default function RegistrationStatus() {
  const [statuses, setStatuses] = useState<RegistrationStatus>({});
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch initial registration statuses
  useEffect(() => {
    const fetchInitialStatuses = async () => {
      try {
        const response = await axios.get('/api/cars');
        const cars = response.data;
        const initialStatuses: RegistrationStatus = {};
        
        for (const car of cars) {
          const statusResponse = await axios.get(`/api/cars/registration-status/${car.registrationNumber}`);
          initialStatuses[car.registrationNumber] = statusResponse.data.isExpired;
        }
        
        setStatuses(initialStatuses);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch registration statuses');
        console.error('Error fetching statuses:', err);
        setLoading(false);
      }
    };

    fetchInitialStatuses();
  }, []);

  // SignalR connection setup
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('/carhub')
      .withAutomaticReconnect()
      .build();

    newConnection.on('RegistrationStatusUpdated', (regNumber: string, isExpired: boolean) => {
      setStatuses(prev => ({...prev, [regNumber]: isExpired}));
    });

    const startConnection = async () => {
      try {
        await newConnection.start();
        setConnection(newConnection);
        setError('');
      } catch (err) {
        setError('Failed to connect to SignalR hub');
        console.error('SignalR connection error:', err);
      }
    };

    startConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  if (loading) return <div className="loading">Loading registration statuses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="registration-status">
      <h1>Registration Status</h1>
      <table>
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(statuses).map(([regNumber, isExpired]) => (
            <tr key={regNumber}>
              <td>{regNumber}</td>
              <td className={isExpired ? 'expired' : 'valid'}>
                {isExpired ? 'Expired' : 'Valid'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}