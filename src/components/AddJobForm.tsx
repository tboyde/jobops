import { useState, type ReactNode } from "react";
import { Link as LinkIcon, Wand2 } from "lucide-react";
import type { Job } from "../types";
import { extractJobDetailsFromUrl } from "../data/jobs";

interface AddJobFormProps {
  onSave: (job: Omit<Job, "id">) => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-input border border-edge bg-field px-4 py-3 text-sm text-fg placeholder:text-muted/60 outline-none transition-all duration-200 focus:border-neon focus:shadow-focus";

export function AddJobForm({ onSave }: AddJobFormProps) {
  const [jobUrl, setJobUrl] = useState("");
  const [draft, setDraft] = useState<Omit<Job, "id"> | null>(null);

  function handleExtract() {
    if (!jobUrl.trim()) return;
    setDraft(extractJobDetailsFromUrl(jobUrl.trim()));
  }

  function handleSave() {
    if (!draft) return;
    onSave(draft);
    setDraft(null);
    setJobUrl("");
  }

  return (
    <div className="max-w-2xl rounded-modal border border-edge bg-panel p-8 shadow-card">
      <h2 className="font-display text-xl font-bold text-fg">Add a Job Posting</h2>
      <p className="mt-1.5 text-sm text-muted">
        Paste a job URL to create editable starter details. AI extraction connects to your Kotlin backend.
      </p>

      <div className="mt-6 flex gap-3">
        <div className="relative flex-1">
          <LinkIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleExtract()}
            placeholder="https://company.com/careers/role"
            className={`${inputClass} pl-10`}
          />
        </div>
        <button
          onClick={handleExtract}
          className="flex items-center gap-2 rounded-btn border border-edge bg-transparent px-4 py-3 text-sm font-medium text-fg hover:bg-white/[0.04] transition-colors duration-200"
        >
          <Wand2 size={14} /> Extract
        </button>
      </div>

      {draft && (
        <div className="mt-8 grid gap-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company">
              <input
                className={inputClass}
                value={draft.companyName}
                onChange={(e) => setDraft({ ...draft, companyName: e.target.value })}
              />
            </Field>
            <Field label="Salary Range">
              <input
                className={inputClass}
                value={draft.salary}
                onChange={(e) => setDraft({ ...draft, salary: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Position Title">
            <input
              className={inputClass}
              value={draft.positionTitle}
              onChange={(e) => setDraft({ ...draft, positionTitle: e.target.value })}
            />
          </Field>

          <Field label="Tech Stack (comma-separated)">
            <input
              className={inputClass}
              value={draft.techStack.join(", ")}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  techStack: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                })
              }
            />
          </Field>

          <Field label="Notes">
            <textarea
              className={`${inputClass} resize-none`}
              placeholder="Initial thoughts, why this role stands out..."
              rows={3}
              value={draft.notes}
              onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
            />
          </Field>

          <button
            onClick={handleSave}
            className="rounded-btn bg-neon px-4 py-3 text-sm font-semibold text-[#111] hover:bg-neon-hover transition-colors duration-200"
          >
            Save to Board
          </button>
        </div>
      )}
    </div>
  );
}
