const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.DB_URL;

// db.js
mongoose.connect(url)
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