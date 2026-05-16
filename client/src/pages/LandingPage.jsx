import { Link } from 'react-router-dom';
import { Plane, ArrowRight, AlertTriangle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary overflow-hidden">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Plane className="w-6 h-6 text-accent" />
          <span className="text-xl font-bold" style={{ fontFamily: 'Outfit' }}>Chudaap Trip</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="btn-secondary text-sm px-4 py-2">Log in</Link>
          <Link to="/register" className="btn-primary text-sm px-4 py-2">Join the Squad</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight" style={{ fontFamily: 'Outfit' }}>
            Where are we<br />
            <span className="text-text-secondary">going next?</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            Vote on destinations and let the points decide your next international adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
              Start Voting <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-4">
              I have an account
            </Link>
          </div>
        </div>

        <div className="mt-24 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="card border-border bg-bg-card">
            <div className="flex items-center justify-center gap-3 mb-8">
              <AlertTriangle className="w-6 h-6 text-danger" />
              <h2 className="text-2xl font-bold text-center" style={{ fontFamily: 'Outfit' }}>Ground Rules</h2>
            </div>
            <ul className="space-y-5 text-text-primary font-medium text-lg">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-bg-primary flex items-center justify-center font-bold">1</span>
                <span className="mt-1">bakchodi mat karna faltu ki.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-bg-primary flex items-center justify-center font-bold">2</span>
                <span className="mt-1">ek insaan ek hi ID se ana</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-bg-primary flex items-center justify-center font-bold">3</span>
                <span className="mt-1">no need to add actual gmail Oauth nahi hai.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Outfit' }}>
            Destinations we're considering
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {['🏔️ Kyrgyzstan', '🦅 Kazakhstan', '🏯 Vietnam', '🏙️ Malaysia', '🏝️ Thailand', '🐉 China', '⛪ Georgia', '🏰 Romania', '🐘 Sri Lanka', '🎈 Turkey', '🏔️ Nepal'].map(d => (
              <span key={d} className="px-5 py-2.5 rounded-full glass text-sm font-medium hover:border-accent/50 transition-colors cursor-default">
                {d}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
