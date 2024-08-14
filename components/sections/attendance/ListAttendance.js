import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ListAttendance() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get('/api/users');
      setData(res.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data.');
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Attendance</h2>
  

      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul class="list-group">
          {data.map((val) => (
            <div key={val.id}>
              <li class="list-group-item">{val.name}</li>
             
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
