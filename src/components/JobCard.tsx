import { ExternalLink } from "lucide-react";
import type { Job } from "../types";

interface JobCardProps {
  job: Job;
  onOpen: (job: Job) => void;
  onDragStart: (jobId: string) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

export function JobCard({ job, onOpen, onDragStart, onDragEnd, isDragging }: JobCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("jobId", job.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart(job.id);
      }}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(job)}
      className={`group relative rounded-card border border-edge bg-panel p-4 cursor-pointer select-none
        transition-all duration-200 will-change-transform
        hover:-translate-y-0.5 hover:border-neon hover:shadow-lift
        ${isDragging ? "opacity-40 scale-[0.98]" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
            {job.companyName}
          </p>
          <p className="mt-1 font-display text-sm font-semibold text-fg leading-snug">
            {job.positionTitle}
          </p>
        </div>
        <a
          href={job.jobUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 text-muted opacity-0 group-hover:opacity-100 hover:text-neon transition-all duration-200"
        >
          <ExternalLink size={13} />
        </a>
      </div>

      {job.techStack.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
          {job.techStack.length > 4 && (
            <span className="rounded-full px-2 py-0.5 text-[11px] text-muted/70">
              +{job.techStack.length - 4}
            </span>
          )}
        </div>
      )}

      {(job.salary !== "Not listed" || job.notes) && (
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-edge/60 pt-3">
          {job.salary !== "Not listed" ? (
            <span className="text-xs font-medium text-fg">{job.salary}</span>
          ) : (
            <span />
          )}
          <span className="text-[11px] text-muted">
            {new Date(job.dateAdded).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </span>
        </div>
      )}
    </div>
  );
}
