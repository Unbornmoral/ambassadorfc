import type { AppData, AttendanceRecord, Player, PlayerAttributes, PlayerForm, Position, TrainingSession } from "./types";
import { calculateOverall, uuid } from "./types";

function isoDaysFromNow(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

const NOW = new Date().toISOString();
const LOCATION = "Ambassador FC Training Ground";

const ROSTER: Array<[string, number, Position, string, PlayerAttributes, PlayerForm]> = [
  ["Emeka Okafor", 1, "Goalkeeper", "+2348031000001", { pac: 52, sho: 24, pas: 62, dri: 48, def: 80, phy: 76 }, "Excellent"],
  ["Tunde Balogun", 12, "Goalkeeper", "+2348031000002", { pac: 46, sho: 22, pas: 56, dri: 44, def: 73, phy: 69 }, "Good"],
  ["Samuel Adeyemi", 2, "Defender", "+2348031000003", { pac: 74, sho: 41, pas: 64, dri: 61, def: 77, phy: 75 }, "Good"],
  ["Chinedu Eze", 4, "Defender", "+2348031000004", { pac: 65, sho: 38, pas: 59, dri: 55, def: 80, phy: 82 }, "Excellent"],
  ["Musa Ibrahim", 5, "Defender", "+2348031000005", { pac: 68, sho: 45, pas: 63, dri: 58, def: 75, phy: 79 }, "Good"],
  ["David Oyelaran", 3, "Defender", "+2348031000006", { pac: 77, sho: 47, pas: 67, dri: 66, def: 72, phy: 71 }, "Okay"],
  ["Peter Nwosu", 15, "Defender", "+2348031000007", { pac: 62, sho: 36, pas: 57, dri: 53, def: 71, phy: 76 }, "Good"],
  ["Kelechi Obi", 6, "Midfielder", "+2348031000008", { pac: 69, sho: 63, pas: 78, dri: 76, def: 69, phy: 71 }, "Excellent"],
  ["Ifeanyi Ugo", 8, "Midfielder", "+2348031000009", { pac: 72, sho: 68, pas: 75, dri: 74, def: 63, phy: 68 }, "Good"],
  ["Ahmed Bello", 10, "Midfielder", "+2348031000010", { pac: 78, sho: 73, pas: 80, dri: 82, def: 49, phy: 64 }, "Excellent"],
  ["Joshua Ade", 14, "Midfielder", "+2348031000011", { pac: 67, sho: 61, pas: 71, dri: 69, def: 66, phy: 73 }, "Okay"],
  ["Segun Ojo", 16, "Midfielder", "+2348031000012", { pac: 74, sho: 65, pas: 72, dri: 77, def: 57, phy: 66 }, "Good"],
  ["Victor Agu", 7, "Forward", "+2348031000013", { pac: 86, sho: 78, pas: 67, dri: 82, def: 32, phy: 70 }, "Excellent"],
  ["Daniel Etim", 9, "Forward", "+2348031000014", { pac: 74, sho: 82, pas: 62, dri: 75, def: 34, phy: 80 }, "Good"],
  ["Bright Osaze", 11, "Forward", "+2348031000015", { pac: 82, sho: 74, pas: 69, dri: 79, def: 37, phy: 67 }, "Good"],
  ["Femi Akande", 17, "Forward", "+2348031000016", { pac: 79, sho: 70, pas: 61, dri: 72, def: 31, phy: 74 }, "Okay"],
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
  const players: Player[] = ROSTER.map(([fullName, jerseyNumber, position, phoneNumber, attributes, form]) => ({
    id: uuid(),
    fullName,
    jerseyNumber,
    position,
    phoneNumber,
    active: true,
    attributes,
    overall: calculateOverall(attributes, position),
    form,
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
