import { Users } from 'lucide-react';

export default function VoterBreakdown({ votes }) {
  if (!votes?.length) return (
    <div className="card text-center py-16">
      <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Outfit' }}>No votes yet</h3>
      <p className="text-text-secondary">Waiting for the squad to weigh in...</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {votes.map((vote, vi) => (
        <div
          key={vote._id}
          className="card animate-fade-in-up"
          style={{ animationDelay: `${vi * 0.08}s` }}
        >
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: vote.user.avatarColor }}
            >
              {vote.user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold">{vote.user.name}</h4>
              <p className="text-xs text-text-muted">{vote.user.email}</p>
            </div>
            <span className="ml-auto text-sm text-text-secondary">
              {vote.rankings.length} destination{vote.rankings.length !== 1 ? 's' : ''} ranked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {vote.rankings
              .sort((a, b) => a.rank - b.rank)
              .map(r => (
                <div
                  key={r.destination?._id || r._id}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-bg-input"
                >
                  <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">
                    {r.rank}
                  </span>
                  <span className="text-sm">{r.destination?.emoji}</span>
                  <span className="text-sm font-medium flex-1 truncate">{r.destination?.name || 'Unknown'}</span>
                  <span className="text-xs text-accent font-semibold">{r.points}p</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
