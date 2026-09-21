export type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
export type AttendanceStatus = "present" | "late" | "absent";

export interface Player {
  id: string;
  fullName: string;
  jerseyNumber: number;
  position: Position;
  phoneNumber: string;
  active: boolean;
  createdAt: string;
}

export interface TrainingSession {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
  notes?: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  playerId: string;
  status: AttendanceStatus;
  notes?: string;
  createdAt: string;
}

export interface TeamSettings {
  teamName: string;
  coachName: string;
  coachPhone: string;
  defaultLocation: string;
}

export interface AppData {
  players: Player[];
  sessions: TrainingSession[];
  attendance: AttendanceRecord[];
  settings: TeamSettings;
}

export const POSITIONS: Position[] = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

export const POSITION_SHORT: Record<Position, string> = {
  Goalkeeper: "GK",
  Defender: "DEF",
  Midfielder: "MID",
  Forward: "FWD",
};

export function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "id-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
