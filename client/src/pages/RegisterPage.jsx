import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', reasonForJoining: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.reasonForJoining);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Plane className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Chudaap Trip</span>
          </Link>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Outfit' }}>Join the Squad</h1>
          <p className="text-text-secondary mt-2">Sign up to vote on our next destination</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Full Name</label>
            <input
              className="input-field"
              placeholder="Your name"
              value={form.name}
              onChange={update('name')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={form.email}
              onChange={update('email')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={update('password')}
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Why do you want to join? <span className="text-accent">*</span>
            </label>
            <textarea
              className="input-field min-h-[100px] resize-none"
              placeholder="Tell us why you deserve a spot on this trip... make it convincing 😏"
              value={form.reasonForJoining}
              onChange={update('reasonForJoining')}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <><UserPlus className="w-4 h-4" /> Create Account</>
            )}
          </button>

          <p className="text-center text-text-secondary text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:text-accent-hover font-medium">Log in</Link>
          </p>
        </form>
      </div>

    </div>
  );
}
