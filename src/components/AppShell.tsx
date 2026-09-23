import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardCheck, CalendarDays, LayoutDashboard, Settings, Users, Menu } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/ambassador_logo.jpeg.asset.json";

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
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/" }}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
    </nav>
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
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
        <div className="flex items-center gap-3 px-1 pb-6">
          <TeamBadge />
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">{data.settings.teamName}</p>
            <p className="text-xs text-sidebar-foreground/60">Team Management</p>
          </div>
        </div>
        <NavLinks />
        <div className="mt-auto rounded-md bg-sidebar-accent/60 p-3">
          <p className="text-xs font-medium text-sidebar-foreground">{data.settings.coachName}</p>
          <p className="text-xs text-sidebar-foreground/60">Head Coach</p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-4">
                <div className="flex items-center gap-3 px-1 pb-6 pt-2">
                  <TeamBadge />
                  <p className="text-sm font-semibold text-sidebar-foreground">
                    {data.settings.teamName}
                  </p>
                </div>
                <NavLinks onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h1>
              {subtitle ? (
                <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
            {action}
          </div>
        </header>

        <main className="px-4 pb-28 pt-5 sm:px-6 lg:pb-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card lg:hidden">
        <div className="grid grid-cols-5">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
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
