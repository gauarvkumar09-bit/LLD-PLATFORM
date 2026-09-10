import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, CheckCircle2, Clock, X, ChevronRight, AlertTriangle, Code } from 'lucide-react';

export const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/submissions/history`, { withCredentials: true })
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-[calc(100vh-61px)] bg-slate-950 text-white p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Your Past Attempts</h1>
        <p className="text-sm text-slate-400 mt-1">
          Click any attempt to inspect the full evaluation rubric and candidate solution.
        </p>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading attempts...</p>
      ) : history.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-400 text-sm">No attempts recorded yet. Solve a problem to see your history!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((sub) => (
            <div
              key={sub._id}
              onClick={() => setSelectedSubmission(sub)}
              className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 hover:border-indigo-500/50 cursor-pointer transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base">{sub.problemTitle}</h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Calendar size={13} /> {new Date(sub.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 ${
                      sub.status === 'COMPLETED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : sub.status === 'EVALUATING'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {sub.status === 'COMPLETED' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    {sub.status}
                  </span>

                  {sub.evaluation && (
                    <span className="text-lg font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800 px-3 py-0.5 rounded-lg">
                      {sub.evaluation.overallScore}/100
                    </span>
                  )}
                  <ChevronRight size={18} className="text-slate-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">{selectedSubmission.problemTitle}</h2>
                <span className="text-xs text-slate-400">
                  {new Date(selectedSubmission.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Score header */}
              {selectedSubmission.evaluation && (
                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-lg">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Evaluation Score</span>
                    <p className="text-xs text-slate-500 mt-0.5">Scored out of 100 on system design rubrics</p>
                  </div>
                  <span className="text-3xl font-extrabold text-indigo-400">
                    {selectedSubmission.evaluation.overallScore}/100
                  </span>
                </div>
              )}

              {/* Rubric Breakdown */}
              {selectedSubmission.evaluation?.rubric && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rubric Evaluation</h4>
                  {Object.entries(selectedSubmission.evaluation.rubric).map(([dim, val]) => (
                    <div key={dim} className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold capitalize text-slate-200">
                          {dim.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="text-xs font-bold text-indigo-300">{val.score}/100</span>
                      </div>
                      <p className="text-xs text-slate-300">{val.feedback}</p>
                      <p className="text-[11px] text-amber-300 flex items-start gap-1">
                        <AlertTriangle size={13} className="shrink-0 mt-0.5" /> {val.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Code Snippet Submitted */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code size={14} /> Submitted Solution
                </h4>
                <pre className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
                  {selectedSubmission.solutionText}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};