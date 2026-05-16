import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-accent" />
          <span className="text-lg font-bold" style={{ fontFamily: 'Outfit' }}>Chudaap Trip</span>
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: user.avatarColor }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-bg-card-hover transition-colors text-text-muted hover:text-danger"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
