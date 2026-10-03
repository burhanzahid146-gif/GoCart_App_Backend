const express = require('express');
const supportRouter = express.Router();
const Support = require('../Models/SupportModel.cjs'); 

supportRouter.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    
    const newSupport = await Support.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Your query has been submitted successfully!',
      data: newSupport
    });

  } catch (error) {
    console.error('Support submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error, please try again later.'
    });
  }
});

module.exports = supportRouter;