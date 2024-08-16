import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ListAttendance() {
  const [data, setData] = useState([]);
  const [attendance, setAttendance] = useState([]);
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

   const handleChange = (e)=>{
    const { name, value } = e.target;
    const userId = name.split('-')[1];
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    setAttendance((prevAttendance) => ([
      ...prevAttendance,
       {user_id:userId,
        status: value,
        date: date, 
      },
    ]))
   }
   const handleClick=async()=>{
    console.log(attendance);
    try {
      attendance.forEach(async(val)=>{
        const res = await axios.post('/api/attendance/create',val);
        // setData(res.data);
        // setError(null);
        console.log(val)
      })
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data.');
    }
   }

  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Attendance</h2>
  
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {data.map((val) => (
            <li key={val.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <span>{val.name}</span>
                <div>
                  <label className="me-2">
                    <input type="radio" name={`attendance-${val.id}`} onChange={handleChange} value={"present"}/> Present
                  </label>
                  <label>
                    <input type="radio" name={`attendance-${val.id}`} onChange={handleChange} value={"absent"}/> Absent
                  </label>
                </div>
              </div>
            </li>
          ))}
          <input type="submit" className="mt-3" onClick={handleClick}/>
        </ul>
      )}
    </div>
  );
  
 
}
