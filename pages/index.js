"use client";
import { useState, useEffect } from 'react';

function CartsPage() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCarts() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCarts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCarts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Carts</h1>
      <ul>
        {carts.map(cart => (
          <li key={cart.id}>{cart.id}: {cart.created_at}</li>
        ))}
      </ul>
    </div>
  );
}

export default CartsPage;
