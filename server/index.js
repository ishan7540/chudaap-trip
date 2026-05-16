import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import destinationRoutes from './routes/destinations.js';
import voteRoutes from './routes/votes.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { 
    origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173'] : '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'] 
  }
});

app.use(cors({ 
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173'] : '*' 
}));
app.use(express.json());

app.set('io', io);

app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/votes', voteRoutes);

io.on('connection', (socket) => {
  console.log(`⚡ Client connected: ${socket.id}`);
  socket.on('disconnect', () => console.log(`💤 Client disconnected: ${socket.id}`));
});

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('🍃 MongoDB connected');
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => { console.error('MongoDB connection error:', err); process.exit(1); });
