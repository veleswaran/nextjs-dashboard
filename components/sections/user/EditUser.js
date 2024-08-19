import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditUser = ({ user, user_id, error }) => {
  const [data, setData] = useState(user);
  const router = useRouter();

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user_id}`, data);                                                                                                                                                                                                                                                                                                                                                                     
      router.push('/user');
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  }

  if (error){
    console.log(error)
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
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
            value={data.name || ''}
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
            value={data.phone || ''}
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
            value={data.email || ''}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditUser;
