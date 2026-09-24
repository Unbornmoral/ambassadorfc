import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarClock,
  ClipboardCheck,
  Clock,
  MapPin,
  Percent,
  Trophy,
  Users,
} from "lucide-react";

import logoAsset from "@/assets/ambassador_logo.jpeg.asset.json";
import { AppShell, TeamBadge } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
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
  index,
}: {
  label: string;
  value: string;
  hint?: string | undefined;
  icon: typeof Users;
  index: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border-2 border-foreground/90 bg-card p-5 transition-transform hover:-translate-y-0.5">
      <span className="pointer-events-none absolute -right-2 -top-6 font-display text-8xl text-primary/[0.07]">
        {index}
      </span>
      <div className="flex items-center gap-2 font-condensed text-xs font-bold uppercase tracking-[0.2em] text-primary">
        <Icon className="size-4" /> {label}
      </div>
      <p className="mt-3 truncate font-display text-4xl text-foreground">{value}</p>
      {hint ? (
        <p className="mt-2 truncate font-condensed text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {hint}
        </p>
      ) : null}
      <span className="absolute inset-x-0 bottom-0 h-1 bg-primary transition-all group-hover:h-1.5" />
    </div>
  );
}

function Dashboard() {
  const { data } = useStore();
  const upcoming = upcomingSessions(data);
  const next = upcoming[0];
  const past = pastSessions(data);
  const recent = past.slice(0, 3);
  const rate = overallAttendanceRate(data);
  const squad = data.players.filter((p) => p.active);

  const top = [...squad]
    .map((p) => ({ p, r: playerAttendanceRate(data, p.id) }))
    .sort((a, b) => b.r - a.r)[0];

  const todaySession = upcoming.find((s) => s.date === todayISO());
  const rollCall = todaySession ?? next;

  return (
    <AppShell
      title={`Welcome, ${data.settings.coachName.replace(/^Coach\s+/, "")}`}
      subtitle={`Matchday operations • ${squad.length} registered players`}
    >
      <div className="space-y-6">
        {/* HERO */}
        <section
          className="pitch-lines relative overflow-hidden rounded-xl text-pitch-foreground"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="pitch-stripes absolute inset-0" />
          <img
            src={logoAsset.url}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-16 top-1/2 hidden w-[420px] -translate-y-1/2 rounded-full opacity-15 mix-blend-luminosity md:block"
          />
          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <TeamBadge className="size-16 rounded-full border-2 border-gold sm:size-20" />
                <span className="font-condensed text-xs font-bold uppercase tracking-[0.3em] text-gold">
                  Est. Club • First Team
                </span>
              </div>
              <h2 className="mt-6 font-display text-5xl sm:text-7xl xl:text-8xl">
                {data.settings.teamName}
              </h2>
              <p className="mt-4 font-condensed text-lg font-semibold uppercase tracking-[0.3em] text-pitch-foreground/80 sm:text-xl">
                Discipline <span className="text-gold">•</span> Commitment{" "}
                <span className="text-gold">•</span> Excellence
              </p>
            </div>

            <div className="rounded-lg border border-pitch-foreground/15 bg-pitch/70 p-5 backdrop-blur">
              <p className="flex items-center gap-2 font-condensed text-xs font-bold uppercase tracking-[0.25em] text-gold">
                <CalendarClock className="size-4" /> Next training session
              </p>
              {next ? (
                <>
                  <p className="mt-3 font-display text-2xl sm:text-3xl">{next.title}</p>
                  <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-pitch-foreground/15 pt-4 font-condensed">
                    <div>
                      <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-pitch-foreground/60">Date</dt>
                      <dd className="mt-1 text-sm font-bold uppercase">{formatDate(next.date)}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-pitch-foreground/60">Kick-off</dt>
                      <dd className="mt-1 flex items-center gap-1 text-sm font-bold uppercase">
                        <Clock className="size-3.5" /> {next.time}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-pitch-foreground/60">Venue</dt>
                      <dd className="mt-1 flex items-start gap-1 text-sm font-bold uppercase leading-tight">
                        <MapPin className="mt-0.5 size-3.5 shrink-0" /> {next.location}
                      </dd>
                    </div>
                  </dl>
                </>
              ) : (
                <p className="mt-3 text-sm opacity-80">No sessions scheduled yet.</p>
              )}
              {rollCall ? (
                <Button
                  asChild
                  className="mt-5 w-full bg-gold font-condensed text-base font-bold uppercase tracking-wider text-foreground hover:bg-gold/90"
                >
                  <Link to="/attendance" search={{ session: rollCall.id }}>
                    <ClipboardCheck className="size-4" />
                    {todaySession ? "Session today — roll call" : "Prepare roll call"}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </section>

        {/* CLUB OVERVIEW */}
        <section>
          <SectionTitle kicker="Club overview" title="The squad in numbers" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric index="01" label="Squad" value={String(squad.length)} icon={Users} hint="Active players" />
            <Metric
              index="02"
              label="Sessions"
              value={String(data.sessions.length)}
              icon={CalendarClock}
              hint={`${past.length} completed`}
            />
            <Metric index="03" label="Attendance" value={`${rate}%`} icon={Percent} hint="Late counts as half" />
            <Metric
              index="04"
              label="Player of commitment"
              value={top ? top.p.fullName.split(" ").slice(-1)[0] ?? "—" : "—"}
              icon={Trophy}
              hint={top ? `${top.p.fullName} • ${top.r}%` : undefined}
            />
          </div>
        </section>

        {/* RECENT */}
        <section>
          <SectionTitle kicker="Training log" title="Recent sessions" />
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sessions recorded yet.</p>
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              {recent.map((s) => {
                const sum = sessionSummary(data, s.id);
                const pct = sum.total ? Math.round((sum.marked / sum.total) * 100) : 0;
                return (
                  <Link
                    key={s.id}
                    to="/attendance"
                    search={{ session: s.id }}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between bg-pitch px-4 py-2 font-condensed text-xs font-bold uppercase tracking-[0.2em] text-pitch-foreground">
                      <span>{formatDate(s.date)}</span>
                      <span className="text-gold">{s.time}</span>
                    </div>
                    <div className="flex-1 p-4">
                      <p className="font-display text-xl text-foreground">{s.title}</p>
                      <div className="mt-4 grid grid-cols-3 divide-x divide-border border-y border-border py-2 text-center font-condensed">
                        <Stat n={sum.present} l="Present" c="text-success" />
                        <Stat n={sum.late} l="Late" c="text-warning" />
                        <Stat n={sum.absent} l="Absent" c="text-destructive" />
                      </div>
                      <Progress value={pct} className="mt-3 h-1.5" />
                    </div>
                    <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-condensed text-sm font-bold uppercase tracking-wider text-primary">
                      Match report <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function Stat({ n, l, c }: { n: number; l: string; c: string }) {
  return (
    <div>
      <p className={`font-display text-2xl ${c}`}>{n}</p>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{l}</p>
    </div>
  );
}

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-4 flex items-end gap-4">
      <div>
        <p className="font-condensed text-xs font-bold uppercase tracking-[0.3em] text-primary">{kicker}</p>
        <h3 className="mt-1 font-display text-3xl text-foreground">{title}</h3>
      </div>
      <span className="mb-2 h-0.5 flex-1 bg-foreground/80" />
    </div>
  );
}
