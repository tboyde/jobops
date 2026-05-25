export type JobStatus = "TO_APPLY" | "IN_PROGRESS" | "UNDER_REVIEW" | "COMPLETED";

export interface Job {
  id: string;
  companyName: string;
  positionTitle: string;
  techStack: string[];
  salary: string;
  jobUrl: string;
  status: JobStatus;
  dateAdded: string;
  notes: string;
}

export interface StatusConfig {
  key: JobStatus;
  label: string;
}

export type ActiveView = "board" | "all" | "add";
