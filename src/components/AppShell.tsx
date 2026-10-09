import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardCheck, CalendarDays, LayoutDashboard, Settings, Users, Menu, LogIn, LogOut, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useAdmin } from "@/lib/admin-context";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      src="/ambassador_logo.jpeg"
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
  const { isAdmin, login, logout } = useAdmin();
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function submitLogin() {
    setSubmitting(true);
    setLoginError("");
    try {
      const ok = await login(password);
      if (ok) {
        setPassword("");
        setLoginOpen(false);
      } else {
        setLoginError("Incorrect admin password.");
      }
    } catch {
      setLoginError("Unable to sign in right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

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
            <div className="flex shrink-0 items-center gap-2">
              {isAdmin ? (
                <>
                  <span className="hidden items-center gap-1.5 rounded-sm border border-gold/50 bg-gold/15 px-2 py-1 font-condensed text-xs font-bold uppercase tracking-wider text-foreground sm:inline-flex">
                    <ShieldCheck className="size-3.5" /> Admin mode
                  </span>
                  <Button variant="outline" size="sm" onClick={() => void logout()} aria-label="Log out of admin mode">
                    <LogOut className="size-4" /><span className="hidden sm:inline">Logout</span>
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setLoginOpen(true)}>
                  <LogIn className="size-4" /><span className="hidden sm:inline">Admin Login</span><span className="sm:hidden">Admin</span>
                </Button>
              )}
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

      <Dialog open={loginOpen} onOpenChange={(next) => {
        setLoginOpen(next);
        if (!next) { setPassword(""); setLoginError(""); }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin login</DialogTitle>
            <DialogDescription>Enter the shared admin password to manage the club.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Admin password</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") void submitLogin(); }}
            />
            {loginError ? <p role="alert" className="text-sm text-destructive">{loginError}</p> : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLoginOpen(false)}>Cancel</Button>
            <Button onClick={() => void submitLogin()} disabled={submitting || !password}>
              {submitting ? "Signing in…" : "Login"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
