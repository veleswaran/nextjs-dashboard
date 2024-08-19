import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";

export default function ListUser() {
  const [data, setData] = useState([]);
  const [dlt, setDlt] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get('/api/users');
      console.log(res.data)
      setData(res.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data.');
    }
  });

  const deleteData = useCallback(async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setDlt(prev => !prev);
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete data.');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData,dlt]);

  const handleDelete = (id) => deleteData(id);

  const EditData = useCallback(async (id) => {
    try {
      router.push(`/user/edit/${id}`)
      setDlt(null);
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete data.');
    }
  }, []);
  const handleEdit = (id) => EditData(id)

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Information</h2>
      <Link className="btn btn-primary" href="/user/create">Add User</Link>
      
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (

        <table className="table table-striped border border-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(item.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
