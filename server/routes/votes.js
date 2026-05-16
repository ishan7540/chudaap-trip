import { Router } from 'express';
import Vote from '../models/Vote.js';
import Destination from '../models/Destination.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, async (req, res) => {
  try {
    const { rankings } = req.body;
    if (!rankings || !rankings.length || rankings.length > 10) {
      return res.status(400).json({ error: 'Provide 1-10 ranked destinations' });
    }
    const ranks = rankings.map((r, i) => ({
      destination: r.destination,
      rank: i + 1,
      points: 10 - i
    }));
    const vote = await Vote.findOneAndUpdate(
      { user: req.user._id },
      { user: req.user._id, rankings: ranks },
      { upsert: true, new: true, runValidators: true }
    ).populate('rankings.destination');
    req.app.get('io').emit('vote-updated');
    res.json({ vote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const vote = await Vote.findOne({ user: req.user._id }).populate('rankings.destination');
    res.json({ vote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/me', auth, async (req, res) => {
  try {
    await Vote.findOneAndDelete({ user: req.user._id });
    req.app.get('io').emit('vote-updated');
    res.json({ message: 'Vote removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/leaderboard', auth, async (req, res) => {
  try {
    const votes = await Vote.find().populate('rankings.destination').populate('user', 'name avatarColor');
    const board = {};
    votes.forEach(v => {
      v.rankings.forEach(r => {
        if (!r.destination) return;
        const id = r.destination._id.toString();
        if (!board[id]) {
          board[id] = {
            destination: r.destination,
            totalPoints: 0,
            voterCount: 0,
            voters: []
          };
        }
        board[id].totalPoints += r.points;
        board[id].voterCount += 1;
        board[id].voters.push({
          user: v.user,
          rank: r.rank,
          points: r.points
        });
      });
    });
    const leaderboard = Object.values(board).sort((a, b) => b.totalPoints - a.totalPoints);
    const totalVoters = votes.length;
    res.json({ leaderboard, totalVoters });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/details', auth, async (req, res) => {
  try {
    const votes = await Vote.find()
      .populate('user', 'name email avatarColor')
      .populate('rankings.destination');
    res.json({ votes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
