const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/hotels';

// db.js
mongoose.connect('mongodb://localhost:27017/your_db')
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('Connection error:', err));

    const db = mongoose.connection;

    db.on('connected', () => {
      console.log('Mongoose connected to ' + url);
    });

    db.on('error', (err) => {
      console.log('Mongoose connection error: ' + err);
    });

    db.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

    module.exports = db;