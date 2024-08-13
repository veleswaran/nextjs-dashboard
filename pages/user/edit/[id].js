'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    console.log(id);
    const res = await axios.get(`http://localhost:3000/api/users/${id}`);
    const data = res.data;

    return {
      props: {
        user: data,
        user_id:id,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        error: 'Failed to fetch user data',
      },
    };
  }
}

export default function UserPage({ user, user_id , error }) {
  const [data, setData] = useState(user);
  let [id, setId] = useState(user_id);
  const router = useRouter();

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.put(`/api/users/update/${id}`, data);
      console.log(res.data);
      router.push('/user/list');
    console.log(id)

    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
    <h2>User Added Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter your name"
          onChange={handleChange}
          value={data.name}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          onChange={handleChange}
          placeholder="Enter your phone number"
          value={data.phone}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          onChange={handleChange}
          placeholder="Enter your email address"
          value={data.email}
        />
      </div>
  
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
  );
}
