import { ExternalLink } from "lucide-react";
import type { Job, JobStatus } from "../types";
import { STATUSES } from "../data/jobs";

interface AllJobsTableProps {
  jobs: Job[];
  onOpenJob: (job: Job) => void;
}

const STATUS_DOT: Record<JobStatus, string> = {
  TO_APPLY: "bg-status-apply",
  IN_PROGRESS: "bg-status-progress",
  UNDER_REVIEW: "bg-status-review",
  COMPLETED: "bg-status-done",
};

export function AllJobsTable({ jobs, onOpenJob }: AllJobsTableProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-card border border-edge/60 bg-white/[0.02] py-20 text-center">
        <p className="font-display text-lg font-semibold text-fg">No jobs to show.</p>
        <p className="mt-1.5 text-sm text-muted">Add a posting or adjust your search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-edge bg-panel">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-edge">
            {["Company", "Position", "Tech Stack", "Salary", "Status", "Added"].map((h) => (
              <th
                key={h}
                className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              onClick={() => onOpenJob(job)}
              className="border-t border-edge/60 hover:bg-white/[0.03] cursor-pointer transition-colors duration-200"
            >
              <td className="px-5 py-4 font-medium text-fg">{job.companyName}</td>
              <td className="px-5 py-4">
                <span className="flex items-center gap-2 text-fg">
                  {job.positionTitle}
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted hover:text-neon transition-colors duration-200"
                  >
                    <ExternalLink size={12} />
                  </a>
                </span>
              </td>
              <td className="px-5 py-4 text-muted">{job.techStack.slice(0, 3).join(", ")}{job.techStack.length > 3 ? "…" : ""}</td>
              <td className="px-5 py-4 text-muted">{job.salary}</td>
              <td className="px-5 py-4">
                <span className="inline-flex items-center gap-2 text-fg">
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[job.status]}`} />
                  <span className="text-xs">
                    {STATUSES.find((s) => s.key === job.status)?.label}
                  </span>
                </span>
              </td>
              <td className="px-5 py-4 text-muted text-xs">
                {new Date(job.dateAdded).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
