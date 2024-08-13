'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Home() {
  const [data, setData] = useState([]);
  let [dlt, setDlt] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get('/api/users');
        setData(res.data);
        console.log(res.data);
        setDlt(false);
      } catch (error) {
        console.error('There was an error submitting the form:', error);
        setError('Failed to fetch data.');
      }
    }
    getData();
  }, [dlt]);

  function handleDelete(id) {
    async function deleteData() {
      try {
        let res = await axios.delete(`/api/users/delete/${id}`);
        setDlt(true);
      } catch (error) {
        console.error('There was an error submitting the form:', error);
        setError('Failed to fetch data.');
      }
    }
    deleteData();
  }
  function handleEdit(id) {
    Cookies.set('id', id);
    router.push(`/user/edit/${id}`);
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Information</h2>

      {data.length === 0 ? (
        <p>loading ...</p>
      ) : (
        <>
          <table className="table-striped table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="btn btn-danger me-4"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete{' '}
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(item.id)}
                    >
                      Update{' '}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
