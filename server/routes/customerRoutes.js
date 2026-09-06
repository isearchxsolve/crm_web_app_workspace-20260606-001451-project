const express = require('express');
const Customer = require('../models/Customer');

const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a customer
router.post('/', async (req, res) => {
  const { name, email, phone, address, notes } = req.body;
  try {
    const newCustomer = new Customer({ name, email, phone, address, notes });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;