import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import mongoose from 'mongoose';
import Destination from './models/Destination.js';
import { destinations } from './data/destinations.js';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('🍃 Connected to MongoDB');

  await Destination.deleteMany({});
  console.log('🗑️  Cleared existing destinations');

  const created = await Destination.insertMany(destinations);
  console.log(`✅ Seeded ${created.length} destinations:`);
  created.forEach(d => console.log(`   ${d.emoji} ${d.name} (${d.region}) — ${d.budgetLevel}, safety: ${d.safetyRating}/10`));

  await mongoose.disconnect();
  console.log('🍃 Disconnected from MongoDB');
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });
