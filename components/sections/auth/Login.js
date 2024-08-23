'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

const formFields = [
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email address',
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password ',
  },
];

export default function Login() {
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
        const res = await axios.post('/api/auth/login', data);
        console.log(res.data.token);
        Cookies.set('vel', res.data.token, { expires: 7 });
        router.push("user")
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

