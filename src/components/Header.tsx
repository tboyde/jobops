import { useState } from "react";
import { Plus } from "lucide-react";

interface HeaderProps {
  onAddJob: () => void;
}

function Logo() {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <img
        src="/job-ops-logo.png"
        alt="JobOps"
        className="h-28 w-auto"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className="font-display text-2xl font-black tracking-tight text-fg">
      Job<span className="text-neon">Ops</span>
    </span>
  );
}

export function Header({ onAddJob }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 h-[140px] border-b border-edge bg-ink/95 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-8">
        <Logo />
        <button
          onClick={onAddJob}
          className="flex items-center gap-2 rounded-btn bg-neon px-4 py-2.5 text-sm font-semibold text-[#111] hover:bg-neon-hover transition-colors duration-200"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Job
        </button>
      </div>
    </header>
  );
}
