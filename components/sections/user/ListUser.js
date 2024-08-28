import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ListUser() {
  const [data, setData] = useState([]);
  const [dlt, setDlt] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get('/api/users');
      console.log(res.data);
      setData(res.data);
      setError(null);
    } catch (error) {
      if (error.response.status === 401) {
        router.push('/401');
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
      } else {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
      }
    }
  });

  const deleteData = useCallback(async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setDlt((prev) => !prev);
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete data.');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, dlt]);

  const handleDelete = (id) => deleteData(id);

  const EditData = useCallback(async (id) => {
    try {
      router.push(`/user/edit/${id}`);
      setDlt(null);
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete data.');
    }
  }, []);
  const handleEdit = (id) => EditData(id);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Information</h2>
      <Link className="btn btn-primary mb-4" href="/register">
        Add User
      </Link>

      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className='container row mb-5'>
          {data.map((val,index) => (
            <div class="col-lg-3 col-md-6 col-sm-12 container mt-5" key={index}>
              <div class="card" style={{ width: '100%' }}>
                <img
                  src="images/401.jpg"
                  class="card-img-top"
                  alt="Card image"
                />
                <div class="card-body">
                  <h5 class="card-title">{val.name}</h5>
                  <p class="card-text">{val.email}</p>
                  <a href="#" class="btn btn-primary">
                    More information
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
