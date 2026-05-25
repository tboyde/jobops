import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Job, JobStatus, ActiveView } from "./types";
import { starterJobs } from "./data/jobs";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { JobBoard } from "./components/JobBoard";
import { JobModal } from "./components/JobModal";
import { AddJobForm } from "./components/AddJobForm";
import { AllJobsTable } from "./components/AllJobsTable";
import { LoginScreen } from "./components/LoginScreen";

const VIEW_TITLES: Record<ActiveView, { title: string; subtitle: string }> = {
  board: { title: "Job Board", subtitle: "Move with strategy. One column at a time." },
  all: { title: "All Jobs", subtitle: "Every role you're tracking, in one view." },
  add: { title: "Add a Job", subtitle: "Capture the next opportunity." },
};

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>("board");
  const [jobs, setJobs] = useState<Job[]>(starterJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return jobs;
    return jobs.filter(
      (job) =>
        job.companyName.toLowerCase().includes(term) ||
        job.positionTitle.toLowerCase().includes(term) ||
        job.techStack.join(" ").toLowerCase().includes(term)
    );
  }, [jobs, searchTerm]);

  function addJob(jobData: Omit<Job, "id">) {
    setJobs((prev) => [{ id: crypto.randomUUID(), ...jobData }, ...prev]);
    setActiveView("board");
  }

  function moveJob(jobId: string, newStatus: JobStatus) {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)));
  }

  function updateJobNotes(jobId: string, notes: string) {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, notes } : j)));
    if (selectedJob?.id === jobId) {
      setSelectedJob((prev) => (prev ? { ...prev, notes } : null));
    }
  }

  function updateJobStatus(jobId: string, status: JobStatus) {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status } : j)));
    if (selectedJob?.id === jobId) {
      setSelectedJob((prev) => (prev ? { ...prev, status } : null));
    }
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const view = VIEW_TITLES[activeView];

  return (
    <div className="min-h-screen bg-ink text-fg flex flex-col">
      <Header onAddJob={() => setActiveView("add")} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} onNavigate={setActiveView} jobCount={jobs.length} />

        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-8 py-10">
            {/* Page title */}
            <div className="mb-8 flex flex-col gap-1">
              <h1 className="font-display text-3xl font-bold text-fg">{view.title}</h1>
              <p className="text-sm text-muted">{view.subtitle}</p>
            </div>

            {/* Search — only on board / all views */}
            {activeView !== "add" && (
              <div className="mb-8 max-w-md">
                <div className="flex items-center gap-3 rounded-input border border-edge bg-field px-4 py-3 transition-all duration-200 focus-within:border-neon focus-within:shadow-focus">
                  <Search size={15} className="text-muted shrink-0" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search company, role, or tech stack..."
                    className="w-full bg-transparent text-sm text-fg placeholder:text-muted/70 outline-none"
                  />
                </div>
              </div>
            )}

            {activeView === "add" && <AddJobForm onSave={addJob} />}
            {activeView === "board" && (
              <JobBoard jobs={filteredJobs} onMoveJob={moveJob} onOpenJob={setSelectedJob} />
            )}
            {activeView === "all" && (
              <AllJobsTable jobs={filteredJobs} onOpenJob={setSelectedJob} />
            )}
          </div>
        </main>
      </div>

      {selectedJob && (
        <JobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onUpdateNotes={updateJobNotes}
          onUpdateStatus={updateJobStatus}
        />
      )}
    </div>
  );
}
