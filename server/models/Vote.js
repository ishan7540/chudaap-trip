import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  rankings: [{
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    rank: { type: Number, required: true, min: 1, max: 10 },
    points: { type: Number, required: true }
  }]
}, { timestamps: true });

voteSchema.pre('save', function(next) {
  this.rankings.forEach(r => { r.points = 11 - r.rank; });
  next();
});

export default mongoose.model('Vote', voteSchema);
