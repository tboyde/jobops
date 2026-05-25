import React from "react";
import { LayoutDashboard, ListTodo, Plus } from "lucide-react";
import type { ActiveView } from "../types";

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  jobCount: number;
}

const NAV_ITEMS: { view: ActiveView; label: string; icon: React.ReactNode }[] = [
  { view: "board", label: "Job Board", icon: <LayoutDashboard size={16} /> },
  { view: "all", label: "All Jobs", icon: <ListTodo size={16} /> },
  { view: "add", label: "Add Job", icon: <Plus size={16} /> },
];

export function Sidebar({ activeView, onNavigate, jobCount }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-edge bg-rail px-4 py-6 gap-1">
      <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted/70">
        Workspace
      </p>

      {NAV_ITEMS.map(({ view, label, icon }) => {
        const isActive = activeView === view;
        return (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className={`group flex w-full items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-medium transition-all duration-200 text-left
              ${isActive
                ? "bg-neon/[0.12] text-neon"
                : "text-muted hover:bg-white/[0.04] hover:text-fg"
              }`}
          >
            <span className={isActive ? "text-neon" : "text-muted group-hover:text-fg"}>
              {icon}
            </span>
            <span>{label}</span>
            {view === "all" && (
              <span className={`ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold
                ${isActive ? "bg-neon/20 text-neon" : "bg-white/[0.04] text-muted"}`}>
                {jobCount}
              </span>
            )}
          </button>
        );
      })}

    </aside>
  );
}
