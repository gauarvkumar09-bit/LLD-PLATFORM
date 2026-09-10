import { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useSubmission } from '../hooks/useSubmission';
import { 
  ArrowLeft, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles 
} from 'lucide-react';

export const PracticeWorkspacePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const problem = location.state?.problem || {
    id,
    title: 'Design a Parking Lot System',
    description: 'Design an automated parking system with multiple spot types, hourly fee structure, and ticket issuance.',
  };

  const [language, setLanguage] = useState('java');
  const [solutionText, setSolutionText] = useState(
`// Define your classes, interfaces, and design models here
public class ParkingLot {
    // Add attributes and methods
}
`
  );

  const { submit, loading, error, data } = useSubmission();

  const handleEvaluate = async () => {
    await submit({
      problemTitle: problem.title,
      problemDescription: problem.description,
      solutionText,
    });
  };

  const evalResult = data?.evaluation;

  return (
    <div className="h-[calc(100vh-61px)] flex flex-col bg-slate-950 text-slate-100">
      {/* Top Action Bar */}
      <div className="px-6 py-2.5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <button
          onClick={() => navigate('/problems')}
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={16} /> Back to Problems
        </button>

        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="java">Java</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>

          <button
            onClick={handleEvaluate}
            disabled={loading || !solutionText.trim()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition shadow-lg shadow-indigo-600/20"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
            {loading ? 'Evaluating...' : 'Submit & Evaluate'}
          </button>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Problem Details + Monaco Code Editor */}
        <div className="w-1/2 border-r border-slate-800 flex flex-col bg-slate-900/30">
          <div className="p-4 border-b border-slate-800/80 bg-slate-900/50">
            <h1 className="text-base font-bold text-white">{problem.title}</h1>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{problem.description}</p>
          </div>

          <div className="flex-1 w-full bg-[#1e1e1e]">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={solutionText}
              onChange={(val) => setSolutionText(val || '')}
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                fontFamily: "'Fira Code', 'Courier New', monospace",
              }}
            />
          </div>
        </div>

        {/* Right Side: Evaluation Rubric Result */}
        <div className="w-1/2 overflow-y-auto p-6 bg-slate-950 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400" /> Evaluation Report
            </h2>
            {evalResult && (
              <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-3 py-1 rounded-full">
                Score: {evalResult.overallScore}/100
              </span>
            )}
          </div>

          {error && (
            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <ShieldAlert size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {loading && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
              <p className="text-sm font-medium text-slate-300">Architect is evaluating your architecture...</p>
              <p className="text-xs text-slate-500 max-w-xs">Checking SOLID principles, class responsibilities, and system extensibility.</p>
            </div>
          )}

          {!loading && !evalResult && !error && (
            <div className="py-24 text-center text-slate-500 space-y-2">
              <p className="text-xs">Submit your class design from the editor on the left to receive feedback.</p>
            </div>
          )}

          {evalResult && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                  <h4 className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Strengths
                  </h4>
                  <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                    {evalResult.strengths?.map((s, idx) => <li key={idx}>{s}</li>)}
                  </ul>
                </div>

                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                  <h4 className="text-xs font-semibold text-rose-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle size={14} /> Need Attention
                  </h4>
                  <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                    {evalResult.areasToImprove?.map((a, idx) => <li key={idx}>{a}</li>)}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rubric Breakdown</h3>
                {Object.entries(evalResult.rubric || {}).map(([dimension, details]) => (
                  <div key={dimension} className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 capitalize">
                        {dimension.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        details.score >= 70 
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                          : details.score >= 45 
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                          : 'bg-rose-950 text-rose-300 border border-rose-800/60'
                      }`}>
                        {details.score}/100
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{details.feedback}</p>
                    <div className="mt-1 pt-2 border-t border-slate-800/50 flex items-start gap-1.5 text-[11px] text-indigo-300">
                      <strong className="text-indigo-400 shrink-0">Suggestion:</strong>
                      <span>{details.suggestion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};