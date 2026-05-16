import { Router } from 'express';
import Destination from '../models/Destination.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ name: 1 });
    res.json({ destinations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    res.json({ destination });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
