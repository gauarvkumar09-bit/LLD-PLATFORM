import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Code2, History, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`;

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <span className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
          <Code2 className="text-indigo-500" size={24} /> LLD Platform
        </span>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            <LayoutDashboard size={18} /> Home
          </NavLink>
          <NavLink to="/problems" className={navLinkClass}>
            <Code2 size={18} /> Problems
          </NavLink>
          <NavLink to="/history" className={navLinkClass}>
            <History size={18} /> History
          </NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          {user?.name || user?.email || 'Candidate'}
        </span>
        <button
          onClick={logout}
          title="Logout"
          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};