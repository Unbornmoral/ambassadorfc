import { createFileRoute } from "@tanstack/react-router";
import { CheckCheck, Clock, MapPin, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { PositionBadge } from "@/components/StatusPill";
import { POSITION_ORDER, POSITION_PLURAL, SquadNumber } from "@/components/ClubUI";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, sessionSummary, useStore } from "@/lib/store";
import type { AttendanceStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/attendance")({
  validateSearch: (search: Record<string, unknown>) => ({
    session: typeof search["session"] === "string" ? (search["session"] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Roll Call — Ambassador FC" },
      {
        name: "description",
        content: "Pitch-side attendance tracking with one-tap present, late and absent marking.",
      },
      { property: "og:title", content: "Roll Call — Ambassador FC" },
      {
        property: "og:description",
        content: "Mark training attendance for the Ambassador FC squad in seconds.",
      },
    ],
  }),
  component: AttendancePage,
});

const ACTIONS: Array<{ status: AttendanceStatus; letter: string; label: string }> = [
  { status: "present", letter: "P", label: "Present" },
  { status: "late", letter: "L", label: "Late" },
  { status: "absent", letter: "A", label: "Absent" },
];

function toneFor(status: AttendanceStatus, active: boolean) {
  if (!active) return "border-border bg-card text-muted-foreground hover:border-foreground/60";
  if (status === "present") return "border-transparent bg-success text-success-foreground";
  if (status === "late") return "border-transparent bg-warning text-warning-foreground";
  return "border-transparent bg-destructive text-destructive-foreground";
}

function AttendancePage() {
  const { session: initial } = Route.useSearch();
  const { data, setAttendance, markAllPresent, clearAttendance } = useStore();
  const sorted = [...data.sessions].sort((a, b) =>
    (b.date + b.time).localeCompare(a.date + a.time),
  );
  const [sessionId, setSessionId] = useState(initial || sorted[0]?.id || "");

  useEffect(() => {
    if (initial) setSessionId(initial);
  }, [initial]);

  const session = data.sessions.find((s) => s.id === sessionId) ?? sorted[0];
  const squad = [...data.players]
    .filter((p) => p.active)
    .sort((a, b) => a.jerseyNumber - b.jerseyNumber);
  const sum = session
    ? sessionSummary(data, session.id)
    : { present: 0, late: 0, absent: 0, marked: 0, unmarked: 0, total: 0 };
  const pct = sum.total ? Math.round((sum.marked / sum.total) * 100) : 0;

  const statusBar: Record<AttendanceStatus | "none", string> = {
    present: "bg-success",
    late: "bg-warning",
    absent: "bg-destructive",
    none: "bg-border",
  };

  return (
    <AppShell title="Matchday roll call" subtitle="Tap to select your squad — saved automatically">
      <div className="space-y-5">
        <section
          className="pitch-lines relative overflow-hidden rounded-xl text-pitch-foreground"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="pitch-stripes absolute inset-0" />
          <div className="relative space-y-4 p-5 sm:p-7">
            <p className="font-condensed text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Team sheet • Training session
            </p>
            <Select value={session?.id ?? ""} onValueChange={setSessionId}>
              <SelectTrigger className="h-12 border-pitch-foreground/25 bg-pitch/60 font-condensed text-base font-bold uppercase tracking-wide text-pitch-foreground">
                <SelectValue placeholder="Select a session" />
              </SelectTrigger>
              <SelectContent>
                {sorted.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.title} — {s.date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {session ? (
              <>
                <h2 className="font-display text-4xl sm:text-5xl">{session.title}</h2>
                <div className="flex flex-wrap gap-x-5 gap-y-1 font-condensed text-sm font-semibold uppercase tracking-wider text-pitch-foreground/80">
                  <span>{formatDate(session.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-4" /> {session.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-4" /> {session.location}
                  </span>
                </div>
                <div className="grid grid-cols-4 overflow-hidden rounded-lg border border-pitch-foreground/15 bg-pitch/70 text-center">
                  {(
                    [
                      ["Present", sum.present, "text-success"],
                      ["Late", sum.late, "text-gold"],
                      ["Absent", sum.absent, "text-destructive"],
                      ["Unmarked", sum.unmarked, "text-pitch-foreground/70"],
                    ] as const
                  ).map(([l, n, c]) => (
                    <div key={l} className="border-r border-pitch-foreground/10 py-3 last:border-r-0">
                      <p className={cn("font-display text-3xl sm:text-4xl", c)}>{n}</p>
                      <p className="mt-1 font-condensed text-[10px] font-bold uppercase tracking-[0.2em] text-pitch-foreground/60 sm:text-xs">
                        {l}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="mb-1.5 flex justify-between font-condensed text-xs font-bold uppercase tracking-[0.2em]">
                    <span className="text-pitch-foreground/70">Squad checked in</span>
                    <span className="text-gold">{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-2 bg-pitch-foreground/15" />
                </div>
              </>
            ) : (
              <p className="text-sm opacity-80">Schedule a session to begin.</p>
            )}
          </div>
        </section>

        {session ? (
          <>

            <div className="sticky top-[76px] z-10 flex gap-2 rounded-lg border-2 border-foreground bg-card p-2 sm:top-[84px]">
              <Button
                className="h-12 flex-1 font-condensed text-base font-bold uppercase tracking-wider"
                onClick={() => {
                  markAllPresent(session.id);
                  toast.success("Full squad marked present");
                }}
              >
                <CheckCheck className="size-5" /> Full squad present
              </Button>
              <Button
                variant="outline"
                className="h-12 font-condensed text-base font-bold uppercase tracking-wider"
                onClick={() => {
                  clearAttendance(session.id);
                  toast.success("Team sheet cleared");
                }}
              >
                <RotateCcw className="size-4" /> Reset
              </Button>
            </div>

            {POSITION_ORDER.map((pos) => {
              const group = squad.filter((p) => p.position === pos);
              if (!group.length) return null;
              return (
                <section key={pos}>
                  <div className="mb-3 flex items-center gap-3 border-b-2 border-foreground pb-2">
                    <h3 className="font-display text-2xl text-foreground">{POSITION_PLURAL[pos]}</h3>
                    <span className="ml-auto font-condensed text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      {group.filter((p) =>
                        data.attendance.some((a) => a.sessionId === session.id && a.playerId === p.id),
                      ).length}
                      /{group.length} marked
                    </span>
                  </div>
                  <div className="grid gap-3 lg:grid-cols-2">
                    {group.map((p) => {
                      const record = data.attendance.find(
                        (a) => a.sessionId === session.id && a.playerId === p.id,
                      );
                      return (
                        <div
                          key={p.id}
                          className="relative flex items-center gap-3 overflow-hidden rounded-lg border border-border bg-card p-3 pl-4"
                        >
                          <span
                            className={cn(
                              "absolute inset-y-0 left-0 w-1.5 transition-colors",
                              statusBar[record?.status ?? "none"],
                            )}
                          />
                          <SquadNumber number={p.jerseyNumber} name={p.fullName} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-condensed text-base font-bold uppercase leading-tight text-foreground">
                              {p.fullName}
                            </p>
                            <PositionBadge position={p.position} className="mt-1" />
                          </div>
                          <div className="flex shrink-0 gap-1.5">
                            {ACTIONS.map((a) => (
                              <button
                                key={a.status}
                                aria-label={`${a.label} — ${p.fullName}`}
                                aria-pressed={record?.status === a.status}
                                onClick={() => setAttendance(session.id, p.id, a.status)}
                                className={cn(
                                  "flex size-12 flex-col items-center justify-center rounded-md border-2 font-display text-lg transition-all active:scale-95 sm:size-14",
                                  toneFor(a.status, record?.status === a.status),
                                )}
                              >
                                {a.letter}
                                <span className="font-condensed text-[9px] font-bold tracking-wider">
                                  {a.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </>
        ) : null}
      </div>
    </AppShell>
  );
}
