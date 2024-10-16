import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io'; // Import socket.io with ES module syntax
import connectToDatabase from './db.js'; // Ensure .js extension
import groupRoutes from './routes/groupRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

// Initialize Express
const app = express();
const server = createServer(app);

// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

// Apply middleware to parse JSON request bodies
app.use(express.json());

// Register routes for groups and messages
app.use('/api', groupRoutes);
app.use('/api', messageRoutes);

// Initialize Socket.IO with CORS settings
const io = new Server(server, {
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

    // Notify other users in the channel
    socket.broadcast.to(channelId).emit('userJoined', {
      username,
      message: `${username} has joined the chat.`
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');

    const { username, channelId } = socket.data;
    if (channelId && username) {
      socket.broadcast.to(channelId).emit('userLeft', {
        username,
        message: `${username} has left the chat.`
      });
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for testing
export { app };
