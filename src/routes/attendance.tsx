import { createFileRoute } from "@tanstack/react-router";
import { CheckCheck, Clock, MapPin, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { CountPill, PositionBadge } from "@/components/StatusPill";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  if (!active) return "border-border bg-card text-muted-foreground hover:border-primary/40";
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

  const session = data.sessions.find((s) => s.id === sessionId);
  const squad = [...data.players]
    .filter((p) => p.active)
    .sort((a, b) => a.jerseyNumber - b.jerseyNumber);
  const sum = session
    ? sessionSummary(data, session.id)
    : { present: 0, late: 0, absent: 0, marked: 0, unmarked: 0, total: 0 };
  const pct = sum.total ? Math.round((sum.marked / sum.total) * 100) : 0;

  return (
    <AppShell title="Roll call" subtitle="Tap to mark attendance — saved automatically">
      <div className="space-y-4">
        <Card className="shadow-none">
          <CardContent className="space-y-3 p-4">
            <Select value={sessionId} onValueChange={setSessionId}>
              <SelectTrigger>
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
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>{formatDate(session.date)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {session.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" /> {session.location}
                </span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Schedule a session to begin.</p>
            )}
          </CardContent>
        </Card>

        {session ? (
          <>
            <div className="flex gap-2">
              <CountPill label="Present" value={sum.present} tone="present" />
              <CountPill label="Late" value={sum.late} tone="late" />
              <CountPill label="Absent" value={sum.absent} tone="absent" />
              <CountPill label="Unmarked" value={sum.unmarked} tone="unmarked" />
            </div>

            <Card className="shadow-none">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                  <span>Roster checked in</span>
                  <span className="text-foreground">{pct}%</span>
                </div>
                <Progress value={pct} className="h-2" />
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      markAllPresent(session.id);
                      toast.success("All players marked present");
                    }}
                  >
                    <CheckCheck className="size-4" /> Mark all present
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      clearAttendance(session.id);
                      toast.success("Roll call cleared");
                    }}
                  >
                    <RotateCcw className="size-4" /> Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-2 lg:grid-cols-2">
              {squad.map((p) => {
                const record = data.attendance.find(
                  (a) => a.sessionId === session.id && a.playerId === p.id,
                );
                return (
                  <Card key={p.id} className="shadow-none">
                    <CardContent className="flex items-center gap-3 p-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                        {p.jerseyNumber}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {p.fullName}
                        </p>
                        <PositionBadge position={p.position} className="mt-1" />
                      </div>
                      <div className="flex shrink-0 gap-1.5">
                        {ACTIONS.map((a) => (
                          <button
                            key={a.status}
                            aria-label={`${a.label} — ${p.fullName}`}
                            onClick={() => setAttendance(session.id, p.id, a.status)}
                            className={cn(
                              "size-11 rounded-md border text-sm font-bold transition-colors",
                              toneFor(a.status, record?.status === a.status),
                            )}
                          >
                            {a.letter}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </AppShell>
  );
}
