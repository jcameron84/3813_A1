const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectToDatabase = require('./db');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Initialize Express
const app = express();
const server = http.createServer(app);

// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:4200',  // Allow requests from your Angular frontend
  methods: ['GET', 'POST', 'DELETE', 'PUT'],  // Include other HTTP methods if needed
  credentials: true
}));

// Apply middleware to parse JSON request bodies
app.use(express.json());

// Register routes for groups and messages
app.use('/api', groupRoutes);
app.use('/api', messageRoutes);  // Ensure this line is present to load the routes

// Initialize Socket.IO with CORS settings
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Setup MongoDB Connection
let db;
connectToDatabase()
  .then(database => {
    db = database;
  })
  .catch(err => console.error('Database connection error:', err));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');

  // Join a channel
  socket.on('joinChannel', (channelId, username) => {
    socket.join(channelId);
    console.log(`${username} joined channel: ${channelId}`);

    // Broadcast to the other users in the channel that a new user has joined
    socket.broadcast.to(channelId).emit('userJoined', { username, message: `${username} has joined the chat.` });
  });

  // Listen for disconnect events
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    
    // Assuming you store the username or user ID in socket data
    const { username, channelId } = socket.data;

    if (channelId && username) {
      // Notify other users in the channel that the user has left
      socket.broadcast.to(channelId).emit('userLeft', { username, message: `${username} has left the chat.` });
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
