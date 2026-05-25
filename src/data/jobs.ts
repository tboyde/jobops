import type { Job, StatusConfig } from "../types";

export const STATUSES: StatusConfig[] = [
  { key: "TO_APPLY", label: "To Apply" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "UNDER_REVIEW", label: "Under Review" },
  { key: "COMPLETED", label: "Completed" },
];

export const starterJobs: Job[] = [
  {
    id: crypto.randomUUID(),
    companyName: "WorkOS",
    positionTitle: "Developer Success Engineer",
    techStack: ["TypeScript", "APIs", "Auth", "Developer Tools"],
    salary: "$140k - $180k",
    jobUrl: "https://example.com/workos-role",
    status: "TO_APPLY",
    dateAdded: new Date().toISOString(),
    notes: "Strong fit for dev tools + customer-facing engineering.",
  },
  {
    id: crypto.randomUUID(),
    companyName: "Cloudflare",
    positionTitle: "Software Engineer, Developer Platform",
    techStack: ["JavaScript", "Distributed Systems", "Cloud"],
    salary: "Not listed",
    jobUrl: "https://example.com/cloudflare-role",
    status: "IN_PROGRESS",
    dateAdded: new Date().toISOString(),
    notes: "Tailor resume toward platform and infra work.",
  },
];

export function extractJobDetailsFromUrl(url: string): Omit<Job, "id"> {
  let companyName = "Unknown Company";
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    companyName = hostname.split(".")[0];
    companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
  } catch {
    companyName = "Unknown Company";
  }

  return {
    companyName,
    positionTitle: "Software Engineer",
    techStack: ["Java", "Kotlin", "TypeScript"],
    salary: "Not listed",
    jobUrl: url,
    status: "TO_APPLY",
    dateAdded: new Date().toISOString(),
    notes: "",
  };
}
