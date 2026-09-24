import { createFileRoute } from "@tanstack/react-router";
import { LayoutGrid, List, MessageCircle, Phone, Plus, Search, Trash2, UserPen } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { PositionBadge } from "@/components/StatusPill";
import { POSITION_ORDER, POSITION_PLURAL, SquadNumber } from "@/components/ClubUI";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { playerAttendanceRate, useStore } from "@/lib/store";
import type { Player, Position } from "@/lib/types";
import { POSITIONS, POSITION_SHORT } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/squad")({
  head: () => ({
    meta: [
      { title: "Squad — Ambassador FC" },
      {
        name: "description",
        content: "Search, filter and manage the Ambassador FC player roster by position.",
      },
      { property: "og:title", content: "Squad — Ambassador FC" },
      {
        property: "og:description",
        content: "Player roster, positions, contact details and attendance rates.",
      },
    ],
  }),
  component: SquadPage,
});

type SortKey = "jersey" | "name" | "rate";
const FILTERS: Array<{ label: string; value: Position | "All" }> = [
  { label: "All", value: "All" },
  { label: "GK", value: "Goalkeeper" },
  { label: "DEF", value: "Defender" },
  { label: "MID", value: "Midfielder" },
  { label: "FWD", value: "Forward" },
];

interface FormState {
  fullName: string;
  jerseyNumber: string;
  position: Position | "";
  phoneNumber: string;
}

const EMPTY: FormState = { fullName: "", jerseyNumber: "", position: "", phoneNumber: "" };

function digits(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

function SquadPage() {
  const { data, addPlayer, updatePlayer, removePlayer } = useStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Position | "All">("All");
  const [sort, setSort] = useState<SortKey>("jersey");
  const [view, setView] = useState<"sheet" | "list">("sheet");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Player | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<"fullName" | "jerseyNumber" | "position" | "phoneNumber", string>>>({});
  const [deleteTarget, setDeleteTarget] = useState<Player | null>(null);

  const players = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = data.players.filter((p) => {
      const matchQ =
        !q || p.fullName.toLowerCase().includes(q) || String(p.jerseyNumber).includes(q);
      const matchP = filter === "All" || p.position === filter;
      return matchQ && matchP;
    });
    return list.sort((a, b) => {
      if (sort === "name") return a.fullName.localeCompare(b.fullName);
      if (sort === "rate") return playerAttendanceRate(data, b.id) - playerAttendanceRate(data, a.id);
      return a.jerseyNumber - b.jerseyNumber;
    });
  }, [data, query, filter, sort]);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY);
    setErrors({});
    setSheetOpen(true);
  }

  function openEdit(p: Player) {
    setEditing(p);
    setForm({
      fullName: p.fullName,
      jerseyNumber: String(p.jerseyNumber),
      position: p.position,
      phoneNumber: p.phoneNumber,
    });
    setErrors({});
    setSheetOpen(true);
  }

  function submit() {
    const next: Partial<Record<"fullName" | "jerseyNumber" | "position" | "phoneNumber", string>> = {};
    if (form.fullName.trim().length < 3) next.fullName = "Enter the player's full name.";
    const jersey = Number(form.jerseyNumber);
    if (!form.jerseyNumber || Number.isNaN(jersey) || jersey < 1 || jersey > 99)
      next.jerseyNumber = "Jersey number must be between 1 and 99.";
    else if (
      data.players.some((p) => p.jerseyNumber === jersey && p.id !== editing?.id)
    )
      next.jerseyNumber = "That jersey number is already taken.";
    if (!form.position) next.position = "Choose a position.";
    if (digits(form.phoneNumber).length < 7) next.phoneNumber = "Enter a valid phone number.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const payload = {
      fullName: form.fullName.trim(),
      jerseyNumber: jersey,
      position: form.position as Position,
      phoneNumber: form.phoneNumber.trim(),
    };
    if (editing) {
      updatePlayer(editing.id, payload);
      toast.success(`${payload.fullName} updated`);
    } else {
      addPlayer(payload);
      toast.success(`${payload.fullName} added to the squad`);
    }
    setSheetOpen(false);
  }

  return (
    <AppShell
      title="Squad"
      subtitle={`${data.players.length} registered players`}
      action={
        <Button onClick={openAdd} size="sm">
          <Plus className="size-4" /> Add player
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or jersey number"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="order-last ml-auto flex overflow-hidden rounded-md border-2 border-foreground">
            {([["sheet", "Team sheet", LayoutGrid], ["list", "List", List]] as const).map(([v, l, Icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 font-condensed text-xs font-bold uppercase tracking-wider",
                  view === v ? "bg-foreground text-background" : "bg-card text-foreground",
                )}
              >
                <Icon className="size-3.5" /> {l}
              </button>
            ))}
          </div>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-condensed text-xs font-bold uppercase tracking-wider transition-colors",
                filter === f.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {view === "sheet" ? (
          <div className="space-y-8">
            {POSITION_ORDER.map((pos) => {
              const group = players.filter((p) => p.position === pos);
              if (!group.length) return null;
              return (
                <section key={pos}>
                  <div className="mb-3 flex items-center gap-3 border-b-2 border-foreground pb-2">
                    <h2 className="font-display text-2xl text-foreground sm:text-3xl">
                      {POSITION_PLURAL[pos]}
                    </h2>
                    <span className="rounded-sm bg-pitch px-2 py-0.5 font-condensed text-sm font-bold text-pitch-foreground">
                      {group.length}
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {group.map((p) => (
                      <div
                        key={p.id}
                        className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-lg"
                      >
                        <span className="pointer-events-none absolute -right-1 -top-4 font-display text-7xl text-primary/[0.07]">
                          {p.jerseyNumber}
                        </span>
                        <div className="relative flex items-center gap-4">
                          <SquadNumber number={p.jerseyNumber} name={p.fullName} size="lg" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-condensed text-lg font-bold uppercase leading-tight text-foreground">
                              {p.fullName}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <PositionBadge position={p.position} />
                              <span className="font-condensed text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                {playerAttendanceRate(data, p.id)}% attendance
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-4 flex gap-1 border-t border-border pt-3">
                          <Button asChild variant="ghost" size="sm" className="flex-1">
                            <a href={`tel:${digits(p.phoneNumber)}`} aria-label="Call player">
                              <Phone className="size-4" />
                            </a>
                          </Button>
                          <Button asChild variant="ghost" size="sm" className="flex-1">
                            <a href={`https://wa.me/${digits(p.phoneNumber)}`} target="_blank" rel="noreferrer" aria-label="WhatsApp player">
                              <MessageCircle className="size-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1" onClick={() => openEdit(p)} aria-label="Edit player">
                            <UserPen className="size-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1" onClick={() => setDeleteTarget(p)} aria-label="Remove player">
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
            {players.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No players found.</p>
            ) : null}
          </div>
        ) : (
        <>
        {/* Mobile cards */}
        <div className="space-y-3 lg:hidden">
          {players.map((p) => (
            <Card key={p.id} className="shadow-none">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <SquadNumber number={p.jerseyNumber} name={p.fullName} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{p.fullName}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <PositionBadge position={p.position} />
                      <span className="text-xs text-muted-foreground">
                        {playerAttendanceRate(data, p.id)}% attendance
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href={`tel:${digits(p.phoneNumber)}`} aria-label="Call player">
                      <Phone className="size-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={`https://wa.me/${digits(p.phoneNumber)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="WhatsApp player"
                    >
                      <MessageCircle className="size-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                    <UserPen className="size-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setDeleteTarget(p)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {players.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No players found.</p>
          ) : null}
        </div>

        {/* Desktop table */}
        <Card className="hidden shadow-none lg:block">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">
                    <button className="font-semibold" onClick={() => setSort("jersey")}>
                      #
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="font-semibold" onClick={() => setSort("name")}>
                      Player
                    </button>
                  </TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>
                    <button className="font-semibold" onClick={() => setSort("rate")}>
                      Attendance
                    </button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-display text-xl">{p.jerseyNumber}</TableCell>
                    <TableCell className="font-medium">{p.fullName}</TableCell>
                    <TableCell>
                      <PositionBadge position={p.position} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{p.phoneNumber}</TableCell>
                    <TableCell>{playerAttendanceRate(data, p.id)}%</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button asChild variant="ghost" size="icon">
                          <a href={`tel:${digits(p.phoneNumber)}`} aria-label="Call">
                            <Phone className="size-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                          <UserPen className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(p)}>
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {players.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No players found.</p>
            ) : null}
          </CardContent>
        </Card>
        </>
        )}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editing ? "Edit player" : "Add player"}</SheetTitle>
            <SheetDescription>
              {editing ? "Update squad details." : "Register a new player in the squad."}
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 px-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="e.g. Victor Agu"
              />
              {errors.fullName ? (
                <p className="text-xs text-destructive">{errors.fullName}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="jersey">Jersey number</Label>
              <Input
                id="jersey"
                inputMode="numeric"
                value={form.jerseyNumber}
                onChange={(e) => setForm({ ...form, jerseyNumber: e.target.value })}
                placeholder="1 – 99"
              />
              {errors.jerseyNumber ? (
                <p className="text-xs text-destructive">{errors.jerseyNumber}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label>Position</Label>
              <Select
                value={form.position}
                onValueChange={(v) => setForm({ ...form, position: v as Position })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p} ({POSITION_SHORT[p]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.position ? (
                <p className="text-xs text-destructive">{errors.position}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                inputMode="tel"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                placeholder="+234 803 000 0000"
              />
              {errors.phoneNumber ? (
                <p className="text-xs text-destructive">{errors.phoneNumber}</p>
              ) : null}
            </div>
          </div>
          <SheetFooter>
            <Button onClick={submit}>{editing ? "Save changes" : "Add to squad"}</Button>
            <Button variant="outline" onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {deleteTarget?.fullName}?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the player and all of their attendance records. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) {
                  removePlayer(deleteTarget.id);
                  toast.success(`${deleteTarget.fullName} removed`);
                }
                setDeleteTarget(null);
              }}
            >
              Remove player
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}
