import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await axios.get('http://localhost:8000/customers');
    setCustomers(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = { ...formData, id: Date.now() };
    await axios.post('http://localhost:8000/customers', newCustomer);
    fetchCustomers();
    setFormData({ name: '', email: '', phone: '', company: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/customers/${id}`);
    fetchCustomers();
  };

  return (
    <div>
      <h1>CRM App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
        <button type="submit">Add Customer</button>
      </form>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - {customer.email} - {customer.phone} - {customer.company}
            <button onClick={() => handleDelete(customer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;