import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const PROBLEMS = [
  {
    id: 'parking-lot',
    title: 'Design a Parking Lot System',
    difficulty: 'Medium',
    description: 'Support multiple spot types (Compact, Large, Handicapped), hourly pricing, ticket issue, and payment processing.',
    tags: ['OOP', 'SOLID', 'Strategy Pattern'],
  },
  {
    id: 'splitwise',
    title: 'Design an Expense Sharing App (Splitwise)',
    difficulty: 'Medium',
    description: 'Support unequal splits, percentage splits, exact amounts, and calculate balance sheet between users.',
    tags: ['State Management', 'Financial Precision'],
  },
  {
    id: 'elevator-system',
    title: 'Design an Elevator Control System',
    difficulty: 'Hard',
    description: 'Dispatch requests across multiple elevators efficiently, handling peak-hour up/down direction queues.',
    tags: ['Concurrency', 'Dispatch Algorithm'],
  },
  {
    id: 'rate-limiter',
    title: 'Design a Client-Side/API Rate Limiter',
    difficulty: 'Easy',
    description: 'Implement Token Bucket or Leaky Bucket algorithms to restrict user traffic per window frame.',
    tags: ['Algorithms', 'Resilience'],
  },
];

export const ProblemsPage = () => {
  return (
    <div className="min-h-[calc(100vh-61px)] bg-slate-950 text-white p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">LLD Problem Statements</h1>
        <p className="text-sm text-slate-400 mt-1">Select a challenge, implement your domain models, and request an architectural evaluation.</p>
      </div>

      <div className="space-y-4">
        {PROBLEMS.map((prob) => (
          <div
            key={prob.id}
            className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between hover:border-slate-700 transition"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg text-white">{prob.title}</h3>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded font-medium ${
                    prob.difficulty === 'Easy'
                      ? 'bg-emerald-950 text-emerald-400'
                      : prob.difficulty === 'Medium'
                      ? 'bg-amber-950 text-amber-400'
                      : 'bg-rose-950 text-rose-400'
                  }`}
                >
                  {prob.difficulty}
                </span>
              </div>
              <p className="text-sm text-slate-400">{prob.description}</p>
              <div className="flex gap-2 pt-1">
                {prob.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to={`/practice/${prob.id}`}
              state={{ problem: prob }}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition shrink-0"
            >
              Solve <ArrowUpRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};