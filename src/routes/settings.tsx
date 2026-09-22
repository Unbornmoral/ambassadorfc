import { createFileRoute } from "@tanstack/react-router";
import { Download, RotateCcw, Save } from "lucide-react";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { playerAttendanceRate, useStore } from "@/lib/store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Ambassador FC" },
      {
        name: "description",
        content: "Edit the Ambassador FC team profile, export data or reset the demo squad.",
      },
      { property: "og:title", content: "Settings — Ambassador FC" },
      {
        property: "og:description",
        content: "Team profile, data export and demo reset for Ambassador FC.",
      },
    ],
  }),
  component: SettingsPage,
});

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function SettingsPage() {
  const { data, updateSettings, resetDemoData } = useStore();
  const [form, setForm] = useState({
    teamName: data.settings.teamName,
    coachName: data.settings.coachName,
    coachPhone: data.settings.coachPhone,
    defaultLocation: data.settings.defaultLocation,
  });

  function exportCsv() {
    const rows = [
      ["Jersey", "Full name", "Position", "Phone", "Attendance rate %"],
      ...data.players.map((p) => [
        String(p.jerseyNumber),
        p.fullName,
        p.position,
        p.phoneNumber,
        String(playerAttendanceRate(data, p.id)),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    download("ambassador-fc-squad.csv", csv, "text/csv");
    toast.success("CSV exported");
  }

  return (
    <AppShell title="Settings" subtitle="Team profile and data utilities">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Team profile</CardTitle>
            <CardDescription>Shown across the app and used as session defaults.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="teamName">Team name</Label>
              <Input
                id="teamName"
                value={form.teamName}
                onChange={(e) => setForm({ ...form, teamName: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coachName">Coach name</Label>
              <Input
                id="coachName"
                value={form.coachName}
                onChange={(e) => setForm({ ...form, coachName: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coachPhone">Coach phone</Label>
              <Input
                id="coachPhone"
                value={form.coachPhone}
                onChange={(e) => setForm({ ...form, coachPhone: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pitch">Home training pitch</Label>
              <Input
                id="pitch"
                value={form.defaultLocation}
                onChange={(e) => setForm({ ...form, defaultLocation: e.target.value })}
              />
            </div>
            <Button
              onClick={() => {
                updateSettings(form);
                toast.success("Team profile saved");
              }}
            >
              <Save className="size-4" /> Save changes
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Export data</CardTitle>
              <CardDescription>Download the squad and attendance history.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  download(
                    "ambassador-fc-data.json",
                    JSON.stringify(data, null, 2),
                    "application/json",
                  );
                  toast.success("JSON exported");
                }}
              >
                <Download className="size-4" /> Export JSON
              </Button>
              <Button variant="outline" onClick={exportCsv}>
                <Download className="size-4" /> Export squad CSV
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/30 shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Reset to demo data</CardTitle>
              <CardDescription>
                Replaces everything with the original demo squad, sessions and attendance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <RotateCcw className="size-4" /> Reset to demo data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset all data?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Every player, session and attendance record you added will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        resetDemoData();
                        toast.success("Demo data restored");
                      }}
                    >
                      Reset
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
