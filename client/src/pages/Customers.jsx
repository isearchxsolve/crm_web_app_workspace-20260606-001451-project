import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer._id}>{customer.name} - {customer.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;