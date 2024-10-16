const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectToDatabase = require('./db');  // Import MongoDB connection
const cors = require('cors');

// Initialize Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS

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
  socket.on('joinChannel', (channelId) => {
    socket.join(channelId);
    console.log(`Client joined channel: ${channelId}`);
  });

  // Send message to the channel
  socket.on('sendMessage', async ({ channelId, content, sender }) => {
    console.log('Received message:', { channelId, content, sender });

    const message = {
      channelId: channelId,
      content: content,
      sender: sender,
      createdAt: new Date(),
    };

    // Save message to MongoDB (or database)
    try {
      const messagesCollection = db.collection('messages');
      await messagesCollection.insertOne(message);

      // Emit the message to all clients in the same channel
      io.to(channelId).emit('newMessage', message);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// API route to get all channels
app.get('/api/channels', async (req, res) => {
  try {
    const channelsCollection = db.collection('channels');
    const channels = await channelsCollection.find({}).toArray();
    res.json(channels);
  } catch (err) {
    res.status(500).send('Error retrieving channels');
  }
});

// API route to create a new channel
app.post('/api/channels', async (req, res) => {
  const { name, description } = req.body;
  const newChannel = { name, description, createdAt: new Date() };

  try {
    const channelsCollection = db.collection('channels');
    const result = await channelsCollection.insertOne(newChannel);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).send('Error creating channel');
  }
});

// API route to get messages of a specific channel
app.get('/api/messages/:channelId', async (req, res) => {
  const channelId = req.params.channelId;

  try {
    const messagesCollection = db.collection('messages');
    const messages = await messagesCollection.find({ channelId }).toArray();
    res.json(messages);
  } catch (err) {
    res.status(500).send('Error retrieving messages');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
