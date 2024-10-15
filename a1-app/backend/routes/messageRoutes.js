const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');
const ObjectId = require('mongodb').ObjectId;  // Ensure you have ObjectId required

// Fetch all messages for a specific channel
router.get('/messages/:channelId', async (req, res) => {
  const channelId = req.params.channelId;

  try {
    const db = await connectToDatabase();
    const messages = await db.collection('messages').find({ channelId }).toArray();
    res.status(200).json(messages);
  } catch (err) {
    console.error('Error retrieving messages:', err);
    res.status(500).json({ message: 'Error retrieving messages', error: err });
  }
});

// Send a new message to a specific channel
router.post('/messages', async (req, res) => {
  const { channelId, content, sender } = req.body;

  if (!channelId || !content || !sender) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newMessage = {
    channelId,
    content,
    sender,
    createdAt: new Date(),
  };

  try {
    const db = await connectToDatabase();
    await db.collection('messages').insertOne(newMessage);
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Failed to send message', error: err });
  }
});

module.exports = router;
