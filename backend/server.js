const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/apply', require('./routes/applicationRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TechBlooms API is running' });
});

// MongoDB Connection
// Supports both formats:
// - mongodb://localhost:27017/techblooms (with database name)
// - mongodb://localhost:27017/ (without database name - will use dbName option)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techblooms';

// Check if connection string includes database name
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// If connection string doesn't have database name (ends with /), specify it
if (MONGODB_URI.endsWith('/') || !MONGODB_URI.match(/\/[^\/]+$/)) {
  connectionOptions.dbName = 'techblooms';
}

mongoose
  .connect(MONGODB_URI, connectionOptions)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

