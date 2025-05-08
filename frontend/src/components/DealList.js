import React, { useEffect, useState } from 'react';
import './Deal.css';
const DealList = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // Simulate fetching deals from backend
    const fetchDeals = async () => {
      try {
        // Replace this with actual API call if needed
        const dummyDeals = [
          { id: 1, title: '50% Off Lipsticks' },
          { id: 2, title: 'Buy 1 Get 1 Free on Foundation' }
        ];

        // Emulate async fetch
        setTimeout(() => {
          setDeals(dummyDeals);
        }, 500);
      } catch (err) {
        console.error('Failed to fetch deals:', err);
        setDeals([]);
      }
    };

    fetchDeals();
  }, []);

  // Ensure deals is always treated as an array
  const safeDeals = Array.isArray(deals) ? deals : [];

  return (
    <div>
      <h3>Latest Deals</h3>
      {safeDeals.length === 0 ? (
        <p>No deals available.</p>
      ) : (
        <ul>
          {safeDeals.map((deal) => (
            <li key={deal.id}>{deal.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DealList;
