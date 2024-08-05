"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState({});

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post("/api/users/create", data);
      console.log(res.data);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  }

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
          />
        </div>
    
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
