'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../layout/Layout';

const formFields = [
  { id: 'name', type: 'text', label: 'Name', placeholder: 'Enter your name' },
  {
    id: 'phone',
    type: 'tel',
    label: 'Phone',
    placeholder: 'Enter your phone number',
  },
  {
    id: 'batch',
    type: 'select', 
    label: 'Batch',
    options: [
      { value: 'morning', label: 'Morning' },
      { value: 'evening', label: 'Evening' },
      { value: 'afternoon', label: 'Afternoon' }
    ],
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email address',
  },
];

export default function CreateUser() {
  const [data, setData] = useState({});
  const router = useRouter();

  const handleChange = useCallback((e) => {
    setData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(data)
      try {
        const res = await axios.post('/api/users/create', data);
        console.log(res.data);
        router.push('/user');
      } catch (error) {
        console.error('There was an error submitting the form:', error);
      }
    },
    [data, router],
  );

  return (
      <div className="container mt-5">
        <h2>User Added Form</h2>
        <form onSubmit={handleSubmit}>
          {formFields.map(({ id, type, label, placeholder, options }) => (
            <div className="mb-3" key={id}>
              <label htmlFor={id} className="form-label">
                {label}
              </label>
              {type === 'select' ? (
                <select
                  className="form-control"
                  id={id}
                  onChange={handleChange}
                  value={data[id] || ''}
                >
                  <option value="" disabled>Select an option</option>
                  {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  className="form-control"
                  id={id}
                  placeholder={placeholder}
                  onChange={handleChange}
                  value={data[id] || ''}
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
  );
}
