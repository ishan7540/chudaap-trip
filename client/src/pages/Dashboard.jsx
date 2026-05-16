import { useState, useEffect, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import Leaderboard from '../components/Leaderboard';
import RankingPanel from '../components/RankingPanel';
import VoterBreakdown from '../components/VoterBreakdown';
import { BarChart3, ListOrdered, Users } from 'lucide-react';

export default function Dashboard() {
  const [destinations, setDestinations] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalVoters, setTotalVoters] = useState(0);
  const [myVote, setMyVote] = useState(null);
  const [votes, setVotes] = useState([]);
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  const fetchData = useCallback(async () => {
    try {
      const [destRes, lbRes, myRes, detailRes] = await Promise.all([
        api.get('/destinations'),
        api.get('/votes/leaderboard'),
        api.get('/votes/me'),
        api.get('/votes/details')
      ]);
      setDestinations(destRes.data.destinations);
      setLeaderboard(lbRes.data.leaderboard);
      setTotalVoters(lbRes.data.totalVoters);
      setMyVote(myRes.data.vote);
      setVotes(detailRes.data.votes);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    if (!socket) return;
    socket.on('vote-updated', fetchData);
    return () => socket.off('vote-updated', fetchData);
  }, [socket, fetchData]);

  const handleVoteSubmit = async (rankings) => {
    await api.post('/votes', { rankings });
    fetchData();
  };

  const handleVoteDelete = async () => {
    if (!window.confirm("Are you sure you want to completely clear your rankings? This cannot be undone.")) return;
    await api.delete('/votes/me');
    fetchData();
  };

  const tabs = [
    { id: 'leaderboard', label: 'Leaderboard', icon: BarChart3 },
    { id: 'rank', label: 'My Rankings', icon: ListOrdered },
    { id: 'voters', label: 'Who Voted', icon: Users }
  ];

  if (loading) return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Outfit' }}>
              Voting Dashboard
            </h1>
            <p className="text-text-secondary mt-1">
              {totalVoters} {totalVoters === 1 ? 'person has' : 'people have'} voted · {destinations.length} destinations
            </p>
          </div>
          <div className="flex gap-1 p-1 rounded-xl bg-bg-card border border-border">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === t.id
                    ? 'bg-accent text-bg-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'
                }`}
              >
                <t.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'leaderboard' && (
          <Leaderboard data={leaderboard} totalVoters={totalVoters} />
        )}
        {activeTab === 'rank' && (
          <RankingPanel
            destinations={destinations}
            myVote={myVote}
            onSubmit={handleVoteSubmit}
            onDelete={handleVoteDelete}
          />
        )}
        {activeTab === 'voters' && (
          <VoterBreakdown votes={votes} />
        )}
      </main>
    </div>
  );
}
