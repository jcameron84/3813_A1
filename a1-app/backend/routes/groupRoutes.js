const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;  // Require ObjectId properly
const connectToDatabase = require('../db');

// Fetch all groups
router.get('/groups', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const groups = await db.collection('groups').find({}).toArray();
    res.json(groups);
  } catch (err) {
    res.status(500).send('Error retrieving groups');
  }
});

// Create a new group
router.post('/groups', async (req, res) => {
    const { name } = req.body;
    const newGroup = {
      name,
      channels: [],  // Initialize an empty array of channels
      createdAt: new Date(),
    };

    try {
      const db = await connectToDatabase();
      const result = await db.collection('groups').insertOne(newGroup);
      res.status(201).json({
        _id: result.insertedId,  // Use insertedId instead of result.ops[0]
        name,
        channels: [],
        createdAt: new Date()
      });
    } catch (err) {
      console.error('Error creating group:', err);  // Log the error
      res.status(500).json({ message: 'Error creating group', error: err });  // Send detailed error message
    }
});

// Create a channel inside a group
router.post('/groups/:id/channels', async (req, res) => {
    const groupId = req.params.id;
    const { name } = req.body;
    const newChannel = {
      _id: new ObjectId(),  // Generate a valid MongoDB ObjectId for the new channel
      name,
      createdAt: new Date(),
    };

    try {
      const db = await connectToDatabase();
      const group = await db.collection('groups').findOne({ _id: new ObjectId(groupId) });

      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      // Add the new channel to the group's channels array
      await db.collection('groups').updateOne(
        { _id: new ObjectId(groupId) },
        { $push: { channels: newChannel } }
      );

      res.status(201).json(newChannel);
    } catch (err) {
      console.error('Error creating channel:', err);
      res.status(500).json({ message: 'Error creating channel', error: err });
    }
});

// Delete a channel inside a group
router.delete('/groups/:groupId/channels/:channelId', async (req, res) => {
    const groupId = req.params.groupId;
    const channelId = req.params.channelId;

    // Check if the channelId is a valid MongoDB ObjectId
    if (!ObjectId.isValid(channelId)) {
      return res.status(400).json({ message: 'Invalid channelId format' });
    }

    try {
      const db = await connectToDatabase();

      // Ensure the group exists
      const group = await db.collection('groups').findOne({ _id: new ObjectId(groupId) });

      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      // Remove the channel with the given channelId from the group's channels array
      const result = await db.collection('groups').updateOne(
        { _id: new ObjectId(groupId) },
        { $pull: { channels: { _id: new ObjectId(channelId) } } }
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Channel deleted successfully' });
      } else {
        res.status(404).json({ message: 'Channel not found' });
      }
    } catch (err) {
      console.error('Error deleting channel:', err);
      res.status(500).json({ message: 'Error deleting channel', error: err });
    }
});

// Delete a group
router.delete('/groups/:id', async (req, res) => {
  const groupId = req.params.id;

  try {
    const db = await connectToDatabase();
    const result = await db.collection('groups').deleteOne({ _id: new ObjectId(groupId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Group deleted successfully' });
    } else {
      res.status(404).json({ message: 'Group not found' });
    }
  } catch (err) {
    console.error('Error deleting group:', err);
    res.status(500).json({ message: 'Error deleting group', error: err });
  }
});

// Get channels for a group
router.get('/groups/:id/channels', async (req, res) => {
  const groupId = req.params.id;

  try {
    const db = await connectToDatabase();
    const group = await db.collection('groups').findOne({ _id: new ObjectId(groupId) });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json(group.channels);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching channels', error: err });
  }
});

module.exports = router;
