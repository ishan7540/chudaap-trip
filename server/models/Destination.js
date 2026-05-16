import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  country: { type: String, required: true, trim: true },
  region: { type: String, required: true, enum: ['Central Asia', 'Southeast Asia', 'East Asia', 'Eastern Europe', 'South Asia', 'Middle East / Europe', 'Other'] },
  budgetLevel: { type: String, required: true, enum: ['budget', 'moderate', 'expensive'] },
  safetyRating: { type: Number, required: true, min: 1, max: 10 },
  emoji: { type: String, default: '🌍' },
  imageUrl: { type: String, default: '' },
  highlights: [String],
  pros: [String],
  cons: [String]
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);
