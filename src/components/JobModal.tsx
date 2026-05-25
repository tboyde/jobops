import { useState, useEffect } from "react";
import { X, ExternalLink, CalendarDays, Save } from "lucide-react";
import type { Job, JobStatus } from "../types";
import { STATUSES } from "../data/jobs";

interface JobModalProps {
  job: Job;
  onClose: () => void;
  onUpdateNotes: (jobId: string, notes: string) => void;
  onUpdateStatus: (jobId: string, status: JobStatus) => void;
}

const STATUS_DOT: Record<JobStatus, string> = {
  TO_APPLY: "bg-status-apply",
  IN_PROGRESS: "bg-status-progress",
  UNDER_REVIEW: "bg-status-review",
  COMPLETED: "bg-status-done",
};

export function JobModal({ job, onClose, onUpdateNotes, onUpdateStatus }: JobModalProps) {
  const [notes, setNotes] = useState(job.notes);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNotes(job.notes);
    setSaved(false);
  }, [job.id, job.notes]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleSaveNotes() {
    // TODO: connect to Kotlin backend — POST /api/jobs/:id/notes
    onUpdateNotes(job.id, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const hasUnsavedChanges = notes !== job.notes;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl rounded-modal border border-edge bg-panel shadow-lift overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-7 pt-7 pb-5">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
              {job.companyName}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-fg leading-tight">
              {job.positionTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-btn border border-edge p-2 text-muted hover:text-fg hover:border-muted transition-colors duration-200"
            aria-label="Close"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-7 pb-7 space-y-6">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5 text-muted">
              <CalendarDays size={13} />
              Added {new Date(job.dateAdded).toLocaleDateString()}
            </span>
            {job.salary !== "Not listed" && (
              <span className="font-medium text-fg">{job.salary}</span>
            )}
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-muted hover:text-neon transition-colors duration-200"
            >
              <ExternalLink size={12} />
              View posting
            </a>
          </div>

          {/* Tech stack */}
          {job.techStack.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {job.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-edge bg-field px-3 py-1 text-xs text-fg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
              Status
            </p>
            <div className="relative inline-flex items-center">
              <span
                className={`pointer-events-none absolute left-3 h-2 w-2 rounded-full ${STATUS_DOT[job.status]}`}
              />
              <select
                value={job.status}
                onChange={(e) => onUpdateStatus(job.id, e.target.value as JobStatus)}
                className="appearance-none rounded-input border border-edge bg-field pl-8 pr-10 py-2.5 text-sm text-fg outline-none transition-all duration-200 focus:border-neon focus:shadow-focus cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
                Notes
              </p>
              <span className="text-[11px] text-muted/70">Local · Kotlin backend coming</span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Strategy, contacts, follow-up reminders..."
              rows={5}
              className="w-full rounded-input border border-edge bg-field px-4 py-3 text-sm text-fg placeholder:text-muted/60 outline-none resize-none transition-all duration-200 focus:border-neon focus:shadow-focus"
            />
            <div className="mt-3 flex items-center justify-end gap-3">
              {saved && (
                <span className="text-xs font-medium text-neon">Saved.</span>
              )}
              <button
                onClick={handleSaveNotes}
                disabled={!hasUnsavedChanges}
                className={`flex items-center gap-1.5 rounded-btn px-4 py-2 text-xs font-semibold transition-all duration-200
                  ${hasUnsavedChanges
                    ? "bg-neon text-[#111] hover:bg-neon-hover"
                    : "border border-edge text-muted cursor-not-allowed"
                  }`}
              >
                <Save size={12} strokeWidth={2.5} /> Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
