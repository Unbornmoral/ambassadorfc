import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Plus, Search, Trash2, UserPen } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { PositionBadge } from "@/components/StatusPill";
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
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Player | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    const next: Record<string, string> = {};
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

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                filter === f.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 lg:hidden">
          {players.map((p) => (
            <Card key={p.id} className="shadow-none">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                    {p.jerseyNumber}
                  </div>
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
                    <TableCell className="font-bold">{p.jerseyNumber}</TableCell>
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
