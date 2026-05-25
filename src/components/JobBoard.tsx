import { useState } from "react";
import { JobCard } from "./JobCard";
import type { Job, JobStatus } from "../types";
import { STATUSES } from "../data/jobs";

interface JobBoardProps {
  jobs: Job[];
  onMoveJob: (jobId: string, newStatus: JobStatus) => void;
  onOpenJob: (job: Job) => void;
}

const STATUS_DOT: Record<JobStatus, string> = {
  TO_APPLY: "bg-status-apply",
  IN_PROGRESS: "bg-status-progress",
  UNDER_REVIEW: "bg-status-review",
  COMPLETED: "bg-status-done",
};

export function JobBoard({ jobs, onMoveJob, onOpenJob }: JobBoardProps) {
  const [draggingJobId, setDraggingJobId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<JobStatus | null>(null);

  function handleDrop(e: React.DragEvent, targetStatus: JobStatus) {
    e.preventDefault();
    const jobId = e.dataTransfer.getData("jobId");
    if (jobId) onMoveJob(jobId, targetStatus);
    setDraggingJobId(null);
    setDragOverColumn(null);
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-card border border-edge/60 bg-white/[0.02] py-20 text-center">
        <p className="font-display text-lg font-semibold text-fg">No jobs added yet.</p>
        <p className="mt-1.5 text-sm text-muted">Let's land the next opportunity.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2">
      {STATUSES.map((status) => {
        const columnJobs = jobs.filter((j) => j.status === status.key);
        const isOver = dragOverColumn === status.key;

        return (
          <div
            key={status.key}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              setDragOverColumn(status.key);
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setDragOverColumn(null);
              }
            }}
            onDrop={(e) => handleDrop(e, status.key)}
            className={`flex flex-col rounded-card p-4 transition-all duration-200
              ${isOver
                ? "bg-white/[0.05] ring-1 ring-neon/40"
                : "bg-white/[0.03]"
              }`}
          >
            <div className="mb-4 flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${STATUS_DOT[status.key]}`} />
                <h2 className="font-display text-sm font-semibold text-fg">{status.label}</h2>
              </div>
              <span className="text-xs font-medium text-muted">{columnJobs.length}</span>
            </div>

            <div className="flex flex-col gap-3 flex-1 min-h-[120px]">
              {columnJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onOpen={onOpenJob}
                  onDragStart={setDraggingJobId}
                  onDragEnd={() => {
                    setDraggingJobId(null);
                    setDragOverColumn(null);
                  }}
                  isDragging={draggingJobId === job.id}
                />
              ))}

              {columnJobs.length === 0 && (
                <div
                  className={`flex flex-1 items-center justify-center rounded-card text-xs py-10 transition-colors
                    ${isOver
                      ? "text-neon/80"
                      : "text-muted/50"
                    }`}
                >
                  {isOver ? "Drop to move here" : "—"}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
