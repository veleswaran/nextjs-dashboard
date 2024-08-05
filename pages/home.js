import {useState} from 'react';
import axios from 'axios';
export default function home() {
  const [data,setData]= useState({})
  function handleChange(e){
    setData({...data,[e.target.id]:e.target.value})

  }
  async function handleSubmit(e){
    e.preventDefault();
    let res = await axios.post("/api/users",data);

    console.log(data)
  }
  return (
    <div class="container mt-5">
      <h2>user Added form </h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">
            Phone
          </label>
          <input
            type="tel"
            class="form-control"
            id="phone"
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            onChange={handleChange}
            placeholder="Enter your email address"
          />
        </div>
        <div class="mb-3">
          <label for="age" class="form-label">
            Age
          </label>
          <input
            type="number"
            class="form-control"
            id="age"
            placeholder="Enter your age"
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
