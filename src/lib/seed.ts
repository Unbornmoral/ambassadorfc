import type { AppData, AttendanceRecord, Player, Position, TrainingSession } from "./types";
import { uuid } from "./types";

function isoDaysFromNow(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

const NOW = new Date().toISOString();
const LOCATION = "Ambassador FC Training Ground";

const ROSTER: Array<[string, number, Position, string]> = [
  ["Emeka Okafor", 1, "Goalkeeper", "+2348031000001"],
  ["Tunde Balogun", 12, "Goalkeeper", "+2348031000002"],
  ["Samuel Adeyemi", 2, "Defender", "+2348031000003"],
  ["Chinedu Eze", 4, "Defender", "+2348031000004"],
  ["Musa Ibrahim", 5, "Defender", "+2348031000005"],
  ["David Oyelaran", 3, "Defender", "+2348031000006"],
  ["Peter Nwosu", 15, "Defender", "+2348031000007"],
  ["Kelechi Obi", 6, "Midfielder", "+2348031000008"],
  ["Ifeanyi Ugo", 8, "Midfielder", "+2348031000009"],
  ["Ahmed Bello", 10, "Midfielder", "+2348031000010"],
  ["Joshua Ade", 14, "Midfielder", "+2348031000011"],
  ["Segun Ojo", 16, "Midfielder", "+2348031000012"],
  ["Victor Agu", 7, "Forward", "+2348031000013"],
  ["Daniel Etim", 9, "Forward", "+2348031000014"],
  ["Bright Osaze", 11, "Forward", "+2348031000015"],
  ["Femi Akande", 17, "Forward", "+2348031000016"],
];

const SESSION_PLAN: Array<[string, number, string]> = [
  ["Saturday Morning Conditioning", -21, "07:30"],
  ["Sunday Tactical Shape & Set Pieces", -15, "16:00"],
  ["Saturday Small-Sided Games", -14, "07:30"],
  ["Sunday Finishing Drills", -8, "16:00"],
  ["Saturday Morning Conditioning", -7, "07:30"],
  ["Sunday Recovery & Possession Work", -1, "16:00"],
  ["Saturday Pre-Match Sharpening", 0, "08:00"],
  ["Sunday Match Day Preparation", 1, "16:00"],
  ["Saturday Strength & Endurance Block", 7, "07:30"],
];

export function buildSeedData(): AppData {
  const players: Player[] = ROSTER.map(([fullName, jerseyNumber, position, phoneNumber]) => ({
    id: uuid(),
    fullName,
    jerseyNumber,
    position,
    phoneNumber,
    active: true,
    createdAt: NOW,
  }));

  const sessions: TrainingSession[] = SESSION_PLAN.map(([title, offset, time], i) => ({
    id: uuid(),
    title,
    date: isoDaysFromNow(offset),
    time,
    location: LOCATION,
    notes: i === 0 ? "Focus on aerobic base and hydration." : undefined,
    createdAt: NOW,
  }));

  const today = isoDaysFromNow(0);
  const attendance: AttendanceRecord[] = [];
  sessions
    .filter((s) => s.date < today)
    .forEach((s, si) => {
      players.forEach((p, pi) => {
        const mix = (si * 7 + pi * 3) % 10;
        const status = mix === 0 ? "absent" : mix === 1 || mix === 2 ? "late" : "present";
        attendance.push({
          id: uuid(),
          sessionId: s.id,
          playerId: p.id,
          status,
          createdAt: NOW,
        });
      });
    });

  return {
    players,
    sessions,
    attendance,
    settings: {
      teamName: "Ambassador FC",
      coachName: "Coach Daniel Obi",
      coachPhone: "+2348030000000",
      defaultLocation: LOCATION,
    },
  };
}
