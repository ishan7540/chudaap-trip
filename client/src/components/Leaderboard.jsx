import { Link } from 'react-router-dom';
import { Trophy, TrendingUp, ChevronRight, Shield, Wallet } from 'lucide-react';

const medalColors = ['text-gold', 'text-silver', 'text-bronze'];
const medalEmoji = ['🥇', '🥈', '🥉'];
const budgetLabels = { budget: 'Budget', moderate: 'Moderate', expensive: 'Expensive' };

export default function Leaderboard({ data, totalVoters }) {
  if (!data.length) return (
    <div className="card text-center py-16">
      <Trophy className="w-12 h-12 text-text-muted mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Outfit' }}>No votes yet</h3>
      <p className="text-text-secondary">Be the first to rank your destinations!</p>
    </div>
  );

  const maxPoints = data[0]?.totalPoints || 1;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {data.slice(0, 3).map((entry, i) => (
          <Link
            key={entry.destination._id}
            to={`/destination/${entry.destination._id}`}
            className={`card gradient-border animate-fade-in-up hover:scale-[1.02] transition-transform ${i === 0 ? 'md:col-span-1' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{medalEmoji[i]}</span>
              <span className={`text-3xl font-bold ${medalColors[i]}`} style={{ fontFamily: 'Outfit' }}>
                {entry.totalPoints}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{entry.destination.emoji}</span>
              <h3 className="text-lg font-bold" style={{ fontFamily: 'Outfit' }}>{entry.destination.name}</h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" />{entry.destination.safetyRating}/10</span>
              <span className="flex items-center gap-1"><Wallet className="w-3 h-3" />{budgetLabels[entry.destination.budgetLevel]}</span>
              <span>{entry.voterCount} voter{entry.voterCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="mt-3 flex -space-x-2">
              {entry.voters.slice(0, 5).map(v => (
                <div
                  key={v.user._id}
                  className="w-6 h-6 rounded-full border-2 border-bg-card flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: v.user.avatarColor }}
                  title={v.user.name}
                >
                  {v.user.name.charAt(0)}
                </div>
              ))}
              {entry.voters.length > 5 && (
                <div className="w-6 h-6 rounded-full border-2 border-bg-card bg-bg-input flex items-center justify-center text-[10px] text-text-muted">
                  +{entry.voters.length - 5}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {data.length > 3 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: 'Outfit' }}>
            <TrendingUp className="w-5 h-5 text-accent" /> Full Rankings
          </h3>
          <div className="space-y-3">
            {data.slice(3).map((entry, i) => (
              <Link
                key={entry.destination._id}
                to={`/destination/${entry.destination._id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-bg-card-hover transition-all group animate-slide-in"
                style={{ animationDelay: `${(i + 3) * 0.05}s` }}
              >
                <span className="text-text-muted font-mono text-sm w-6 text-right">#{i + 4}</span>
                <span className="text-xl">{entry.destination.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{entry.destination.name}</span>
                    <span className="text-xs text-text-muted">{entry.destination.region}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-bg-input overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-700"
                      style={{ width: `${(entry.totalPoints / maxPoints) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-accent">{entry.totalPoints}</span>
                  <span className="text-xs text-text-muted ml-1">pts</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
