import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarPlus, ClipboardCheck, Clock, MapPin, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  formatDate,
  pastSessions,
  sessionSummary,
  todayISO,
  upcomingSessions,
  useStore,
} from "@/lib/store";
import type { TrainingSession } from "@/lib/types";

export const Route = createFileRoute("/sessions")({
  head: () => ({
    meta: [
      { title: "Training Sessions — Ambassador FC" },
      {
        name: "description",
        content: "Schedule weekend training sessions and review completed attendance reports.",
      },
      { property: "og:title", content: "Training Sessions — Ambassador FC" },
      {
        property: "og:description",
        content: "Upcoming and past Ambassador FC training sessions in one timeline.",
      },
    ],
  }),
  component: SessionsPage,
});

function SessionCard({
  session,
  completed,
  onDelete,
}: {
  session: TrainingSession;
  completed: boolean;
  onDelete: () => void;
}) {
  const { data } = useStore();
  const sum = sessionSummary(data, session.id);
  return (
    <Card className="shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{session.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{formatDate(session.date)}</p>
          </div>
          <span
            className={
              "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold " +
              (completed
                ? "border-success/40 bg-success/15 text-primary"
                : "border-primary/30 bg-primary/10 text-primary")
            }
          >
            {completed ? "Completed" : "Upcoming"}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {session.time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" /> {session.location}
          </span>
        </div>
        {session.notes ? (
          <p className="mt-2 text-xs text-muted-foreground">{session.notes}</p>
        ) : null}
        {sum.marked > 0 ? (
          <p className="mt-2 text-xs font-medium text-foreground">
            {sum.present} present • {sum.late} late • {sum.absent} absent
          </p>
        ) : null}
        <div className="mt-3 flex gap-2">
          <Button asChild size="sm" variant={completed ? "outline" : "default"} className="flex-1">
            <Link to="/attendance" search={{ session: session.id }}>
              <ClipboardCheck className="size-4" />
              {completed ? "View report" : "Take attendance"}
            </Link>
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete} aria-label="Delete session">
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SessionsPage() {
  const { data, addSession, removeSession } = useStore();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    date: todayISO(),
    time: "07:30",
    location: data.settings.defaultLocation,
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const upcoming = upcomingSessions(data);
  const past = pastSessions(data);

  function submit() {
    const next: Record<string, string> = {};
    if (form.title.trim().length < 3) next.title = "Give the session a title.";
    if (!form.date) next.date = "Pick a date.";
    if (!form.time) next.time = "Pick a time.";
    if (!form.location.trim()) next.location = "Where is the session?";
    setErrors(next);
    if (Object.keys(next).length) return;
    addSession({
      title: form.title.trim(),
      date: form.date,
      time: form.time,
      location: form.location.trim(),
      ...(form.notes.trim() ? { notes: form.notes.trim() } : {}),
    });
    toast.success("Session scheduled");
    setOpen(false);
    setForm({
      title: "",
      date: todayISO(),
      time: "07:30",
      location: data.settings.defaultLocation,
      notes: "",
    });
  }

  return (
    <AppShell
      title="Training sessions"
      subtitle={`${upcoming.length} upcoming • ${past.length} completed`}
      action={
        <Button size="sm" onClick={() => setOpen(true)}>
          <CalendarPlus className="size-4" /> New session
        </Button>
      }
    >
      <Tabs defaultValue="upcoming">
        <TabsList className="w-full">
          <TabsTrigger value="upcoming" className="flex-1">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1">
            Past
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {upcoming.map((s) => (
            <SessionCard key={s.id} session={s} completed={false} onDelete={() => setDeleteId(s.id)} />
          ))}
          {upcoming.length === 0 ? (
            <p className="py-8 text-sm text-muted-foreground">No upcoming sessions scheduled.</p>
          ) : null}
        </TabsContent>
        <TabsContent value="past" className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {past.map((s) => (
            <SessionCard key={s.id} session={s} completed onDelete={() => setDeleteId(s.id)} />
          ))}
          {past.length === 0 ? (
            <p className="py-8 text-sm text-muted-foreground">No past sessions yet.</p>
          ) : null}
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule a session</DialogTitle>
            <DialogDescription>Add a new training session to the calendar.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Saturday Morning Conditioning"
              />
              {errors.title ? <p className="text-xs text-destructive">{errors.title}</p> : null}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                {errors.date ? <p className="text-xs text-destructive">{errors.date}</p> : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
                {errors.time ? <p className="text-xs text-destructive">{errors.time}</p> : null}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              {errors.location ? (
                <p className="text-xs text-destructive">{errors.location}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Focus of the session"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submit}>Schedule session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this session?</AlertDialogTitle>
            <AlertDialogDescription>
              The session and its attendance records will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  removeSession(deleteId);
                  toast.success("Session deleted");
                }
                setDeleteId(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}
