import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardCheck, CalendarDays, LayoutDashboard, Settings, Users, Menu } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import logoAsset from "@//ambassador_logo.jpeg";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/squad", label: "Squad", icon: Users },
  { to: "/sessions", label: "Sessions", icon: CalendarDays },
  { to: "/attendance", label: "Roll Call", icon: ClipboardCheck },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function TeamBadge({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Ambassador FC badge"
      className={cn(
        "size-10 shrink-0 rounded-lg border border-sidebar-border object-cover",
        className,
      )}
    />
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/" }}
          className="group relative flex items-center gap-3 px-4 py-3 font-condensed text-base font-semibold uppercase tracking-wider text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          activeProps={{
            className:
              "bg-sidebar-accent !text-sidebar-accent-foreground before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gold",
          }}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

function Wordmark({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3">
      <TeamBadge className="size-12 rounded-full border-2 border-gold/60" />
      <div className="leading-none">
        <p className="font-display text-xl text-sidebar-foreground">{name}</p>
        <p className="mt-1 font-condensed text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
          Official Club Platform
        </p>
      </div>
    </div>
  );
}

export function AppShell({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const { data } = useStore();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar pitch-stripes lg:flex">
        <div className="border-b border-sidebar-border px-5 py-6">
          <Wordmark name={data.settings.teamName} />
        </div>
        <div className="py-4">
          <NavLinks />
        </div>
        <div className="mt-auto border-t border-sidebar-border px-5 py-4">
          <p className="font-condensed text-[11px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/50">
            Head Coach
          </p>
          <p className="font-condensed text-lg font-bold uppercase text-sidebar-foreground">
            {data.settings.coachName}
          </p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b-4 border-primary bg-card/95 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0 pitch-stripes">
                <div className="border-b border-sidebar-border px-5 py-6">
                  <Wordmark name={data.settings.teamName} />
                </div>
                <div className="py-4">
                  <NavLinks onNavigate={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-display text-2xl text-foreground sm:text-3xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-1 truncate font-condensed text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {subtitle}
                </p>
              ) : null}
            </div>
            {action}
          </div>
        </header>

        <main className="px-4 pb-28 pt-5 sm:px-6 lg:pb-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-sidebar-border bg-sidebar lg:hidden">
        <div className="grid grid-cols-5">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 font-condensed text-[11px] font-bold uppercase tracking-wider transition-colors",
                  active ? "text-gold" : "text-sidebar-foreground/60",
                )}
              >
                {active ? <span className="absolute inset-x-4 top-0 h-0.5 bg-gold" /> : null}
                <Icon className="size-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
