import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-61px)] bg-slate-950 text-white p-8 flex flex-col items-center justify-center text-center">
      <span className="px-3 py-1 text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
        AI-Powered LLD Practice
      </span>
      <h1 className="text-4xl sm:text-5xl font-extrabold max-w-2xl tracking-tight leading-tight">
        Master Low-Level Design with Real-Time Feedback
      </h1>
      <p className="text-slate-400 max-w-xl mt-4 text-base">
        Submit class models, interfaces, and architecture diagrams. Get evaluated across SOLID principles, extensibility, and separation of concerns.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to="/problems"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Browse Problems <ArrowRight size={18} />
        </Link>
        <Link
          to="/history"
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-lg font-medium border border-slate-700 transition"
        >
          View Attempts
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mt-16 text-left">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <Zap className="text-indigo-400 mb-2" size={24} />
          <h3 className="font-semibold text-white">Instant Rubrics</h3>
          <p className="text-xs text-slate-400 mt-1">Get dimension-level marks for SOLID, edge cases, and class structure.</p>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <ShieldCheck className="text-green-400 mb-2" size={24} />
          <h3 className="font-semibold text-white">Deterministic & Fair</h3>
          <p className="text-xs text-slate-400 mt-1">Scored against architectural trade-offs, not just code compilation.</p>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <CheckCircle className="text-blue-400 mb-2" size={24} />
          <h3 className="font-semibold text-white">Attempt History</h3>
          <p className="text-xs text-slate-400 mt-1">Track weak spots across multiple practice runs and iterate fast.</p>
        </div>
      </div>
    </div>
  );
};