import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  CalendarClock,
  ClipboardCheck,
  Percent,
  Star,
  Users,
} from "lucide-react";

import { AppShell, TeamBadge } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  formatDate,
  overallAttendanceRate,
  pastSessions,
  playerAttendanceRate,
  sessionSummary,
  todayISO,
  upcomingSessions,
  useStore,
} from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ambassador FC — Coach Dashboard" },
      {
        name: "description",
        content:
          "Squad size, attendance rate and the next training session for Ambassador FC, at a glance.",
      },
      { property: "og:title", content: "Ambassador FC — Coach Dashboard" },
      {
        property: "og:description",
        content: "Manage the Ambassador FC squad and weekend training attendance.",
      },
    ],
  }),
  component: Dashboard,
});

function Metric({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string | undefined;
  icon: typeof Users;
}) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex items-start gap-3 p-4">
        <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="truncate text-xl font-bold text-foreground">{value}</p>
          {hint ? <p className="truncate text-xs text-muted-foreground">{hint}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const { data } = useStore();
  const upcoming = upcomingSessions(data);
  const next = upcoming[0];
  const recent = pastSessions(data).slice(0, 3);
  const rate = overallAttendanceRate(data);
  const squad = data.players.filter((p) => p.active);

  const top = [...squad]
    .map((p) => ({ p, r: playerAttendanceRate(data, p.id) }))
    .sort((a, b) => b.r - a.r)[0];

  const todaySession = upcoming.find((s) => s.date === todayISO());
  const rollCall = todaySession ?? next;

  return (
    <AppShell
      title={`Good day, ${data.settings.coachName.replace(/^Coach\s+/, "")}`}
      subtitle={`${data.settings.teamName} • ${squad.length} players in the squad`}
    >
      <div className="space-y-5">
        <Card className="overflow-hidden border-0 text-primary-foreground shadow-none">
          <div style={{ background: "var(--gradient-pitch)" }} className="p-5">
            <div className="flex items-center gap-3">
              <TeamBadge className="border-white/20" />
              <div>
                <p className="text-base font-semibold">{data.settings.teamName}</p>
                <p className="text-xs opacity-80">Home pitch: {data.settings.defaultLocation}</p>
              </div>
            </div>
            <div className="mt-5 rounded-lg bg-white/10 p-4">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide opacity-90">
                <CalendarClock className="size-4" /> Next session
              </p>
              {next ? (
                <>
                  <p className="mt-1 font-semibold">{next.title}</p>
                  <p className="text-sm opacity-90">
                    {formatDate(next.date)} • {next.time} • {next.location}
                  </p>
                </>
              ) : (
                <p className="mt-1 text-sm opacity-90">No sessions scheduled yet.</p>
              )}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Squad size" value={String(squad.length)} icon={Users} hint="Active players" />
          <Metric
            label="Sessions"
            value={String(data.sessions.length)}
            icon={CalendarClock}
            hint={`${recent.length ? pastSessions(data).length : 0} completed`}
          />
          <Metric label="Attendance rate" value={`${rate}%`} icon={Percent} hint="Late counts as half" />
          <Metric
            label="Top committed"
            value={top ? top.p.fullName : "—"}
            icon={Star}
            hint={top ? `${top.r}% attendance` : undefined}
          />
        </div>

        {rollCall ? (
          <Card className="border-primary/30 bg-accent/40 shadow-none">
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {todaySession ? "Session today — quick roll call" : "Get ready for the next session"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {rollCall.title} • {formatDate(rollCall.date)} at {rollCall.time}
                </p>
              </div>
              <Button asChild>
                <Link to="/attendance" search={{ session: rollCall.id }}>
                  <ClipboardCheck className="size-4" /> Take attendance
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : null}

        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="size-4 text-primary" /> Recent activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recent.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sessions recorded yet.</p>
            ) : (
              recent.map((s) => {
                const sum = sessionSummary(data, s.id);
                const pct = sum.total ? Math.round((sum.marked / sum.total) * 100) : 0;
                return (
                  <div key={s.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{s.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(s.date)} • {s.time}
                        </p>
                      </div>
                      <Link
                        to="/attendance"
                        search={{ session: s.id }}
                        className="shrink-0 text-xs font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        View report
                      </Link>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {sum.present} present • {sum.late} late • {sum.absent} absent
                    </p>
                    <Progress value={pct} className="mt-2 h-1.5" />
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
