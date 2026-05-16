import { ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';

export default function ProsCons({ pros = [], cons = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <ThumbsUp className="w-4 h-4 text-success" />
          </div>
          <h3 className="text-lg font-semibold" style={{ fontFamily: 'Outfit' }}>Pros</h3>
          <Sparkles className="w-3.5 h-3.5 text-text-muted ml-auto" title="AI-generated analysis" />
        </div>
        <ul className="space-y-3">
          {pros.map((pro, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
              </span>
              <span className="text-text-secondary leading-relaxed">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center">
            <ThumbsDown className="w-4 h-4 text-danger" />
          </div>
          <h3 className="text-lg font-semibold" style={{ fontFamily: 'Outfit' }}>Cons</h3>
          <Sparkles className="w-3.5 h-3.5 text-text-muted ml-auto" title="AI-generated analysis" />
        </div>
        <ul className="space-y-3">
          {cons.map((con, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="w-5 h-5 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-danger" />
              </span>
              <span className="text-text-secondary leading-relaxed">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
