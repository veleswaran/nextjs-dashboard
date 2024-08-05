'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]); // Initialize as an array
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get('/api/users');
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('There was an error submitting the form:', error);
        setError('Failed to fetch data.');
      }
    }
    getData();
  }, []); // Empty dependency array to run only once

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Information</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
