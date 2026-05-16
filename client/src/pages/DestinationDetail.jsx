import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import ProsCons from '../components/ProsCons';
import { ArrowLeft, Shield, Wallet, MapPin, Star } from 'lucide-react';

export default function DestinationDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(`/destinations/${id}`),
      api.get('/votes/leaderboard')
    ]).then(([destRes, lbRes]) => {
      setDestination(destRes.data.destination);
      setLeaderboard(lbRes.data.leaderboard);
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  if (!destination) return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh] text-text-secondary">
        <p>Destination not found</p>
        <Link to="/dashboard" className="text-accent mt-4">Back to dashboard</Link>
      </div>
    </div>
  );

  const entry = leaderboard.find(e => e.destination._id === id);
  const budgetLabels = { budget: '💰 Budget', moderate: '💵 Moderate', expensive: '💎 Expensive' };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="card mb-6 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="text-6xl">{destination.emoji}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit' }}>
                {destination.name}
              </h1>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1.5 text-sm text-text-secondary px-3 py-1 rounded-full bg-bg-input">
                  <MapPin className="w-3.5 h-3.5" /> {destination.region}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-text-secondary px-3 py-1 rounded-full bg-bg-input">
                  <Wallet className="w-3.5 h-3.5" /> {budgetLabels[destination.budgetLevel]}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-text-secondary px-3 py-1 rounded-full bg-bg-input">
                  <Shield className="w-3.5 h-3.5" /> Safety: {destination.safetyRating}/10
                </span>
              </div>

              {destination.highlights?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {destination.highlights.map(h => (
                    <span key={h} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                      <Star className="w-3 h-3" /> {h}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {entry && (
              <div className="text-center px-6 py-4 rounded-xl bg-bg-input border border-border min-w-[120px]">
                <div className="text-3xl font-bold gradient-text">{entry.totalPoints}</div>
                <div className="text-xs text-text-muted mt-1">total points</div>
                <div className="text-sm text-text-secondary mt-2">{entry.voterCount} voters</div>
              </div>
            )}
          </div>
        </div>

        <ProsCons pros={destination.pros} cons={destination.cons} />

        {entry?.voters?.length > 0 && (
          <div className="card mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Outfit' }}>Who voted for {destination.name}</h3>
            <div className="space-y-3">
              {entry.voters.sort((a, b) => a.rank - b.rank).map(v => (
                <div key={v.user._id} className="flex items-center justify-between p-3 rounded-lg bg-bg-input">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: v.user.avatarColor }}
                    >
                      {v.user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{v.user.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-text-secondary text-sm">Rank #{v.rank}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                      {v.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
