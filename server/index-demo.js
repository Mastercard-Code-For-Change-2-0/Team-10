const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Import middleware
const { logger } = require('./utils/logger');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.io for real-time notifications
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (NODE_ENV !== 'production') {
  app.use(morgan('combined'));
}

// Demo data (in-memory store for hackathon demo)
const demoData = {
  users: [
    { id: 1, name: 'Demo Donor', email: 'donor@demo.com', role: 'donor' },
    { id: 2, name: 'Demo Receiver', email: 'receiver@demo.com', role: 'receiver' },
    { id: 3, name: 'Demo Admin', email: 'admin@demo.com', role: 'admin' }
  ],
  donations: [
    { id: 1, title: 'Winter Clothes', category: 'clothing', quantity: 10, location: 'Mumbai', donor: 'Demo Donor' },
    { id: 2, title: 'Food Supplies', category: 'food', quantity: 50, location: 'Delhi', donor: 'Demo Donor' },
    { id: 3, title: 'Books & Stationery', category: 'education', quantity: 25, location: 'Bangalore', donor: 'Demo Donor' }
  ],
  requests: [
    { id: 1, title: 'Need Warm Clothes', category: 'clothing', quantity: 5, location: 'Mumbai', requester: 'Demo Receiver' },
    { id: 2, title: 'Educational Materials', category: 'education', quantity: 10, location: 'Pune', requester: 'Demo Receiver' }
  ]
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Seva Sahayog API is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Demo API routes
app.get('/api/donations', (req, res) => {
  res.json({ success: true, data: demoData.donations });
});

app.get('/api/requests', (req, res) => {
  res.json({ success: true, data: demoData.requests });
});

app.get('/api/users', (req, res) => {
  res.json({ success: true, data: demoData.users });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ 
    success: true, 
    data: { 
      token: 'demo-jwt-token',
      user: demoData.users[0]
    }
  });
});

app.post('/api/donations', (req, res) => {
  const newDonation = {
    id: demoData.donations.length + 1,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  demoData.donations.push(newDonation);
  res.json({ success: true, data: newDonation });
});

app.post('/api/requests', (req, res) => {
  const newRequest = {
    id: demoData.requests.length + 1,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  demoData.requests.push(newRequest);
  res.json({ success: true, data: newRequest });
});

// Catch-all for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found',
    endpoint: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    ...(NODE_ENV === 'development' && { error: err.message })
  });
});

// Socket.io for real-time features
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);
  
  socket.on('join-room', (room) => {
    socket.join(room);
    logger.info(`User ${socket.id} joined room: ${room}`);
  });
  
  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(PORT, () => {
  logger.info(`🚀 Seva Sahayog API Server running on port ${PORT}`);
  logger.info(`📍 Environment: ${NODE_ENV}`);
  logger.info(`🌐 CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  logger.info(`📊 Demo mode: Using in-memory data store`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

module.exports = app;
