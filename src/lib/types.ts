export type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
export type AttendanceStatus = "present" | "late" | "absent";
export type PlayerForm = "Poor" | "Okay" | "Good" | "Excellent";

export interface PlayerAttributes {
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
}

export interface Player {
  id: string;
  fullName: string;
  jerseyNumber: number;
  position: Position;
  phoneNumber: string;
  active: boolean;
  attributes: PlayerAttributes;
  overall: number;
  form: PlayerForm;
  createdAt: string;
}

export interface TrainingSession {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
  notes?: string | undefined;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  playerId: string;
  status: AttendanceStatus;
  notes?: string | undefined;
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

export const DEFAULT_ATTRIBUTES: Record<Position, PlayerAttributes> = {
  Goalkeeper: { pac: 48, sho: 25, pas: 58, dri: 45, def: 74, phy: 70 },
  Defender: { pac: 67, sho: 42, pas: 61, dri: 57, def: 73, phy: 74 },
  Midfielder: { pac: 70, sho: 64, pas: 73, dri: 72, def: 62, phy: 67 },
  Forward: { pac: 76, sho: 74, pas: 63, dri: 73, def: 35, phy: 68 },
};

export function calculateOverall(attributes: PlayerAttributes, position: Position): number {
  const weights: Record<Position, PlayerAttributes> = {
    Goalkeeper: { pac: 0.05, sho: 0.02, pas: 0.13, dri: 0.05, def: 0.5, phy: 0.25 },
    Defender: { pac: 0.15, sho: 0.05, pas: 0.15, dri: 0.1, def: 0.35, phy: 0.2 },
    Midfielder: { pac: 0.12, sho: 0.15, pas: 0.25, dri: 0.23, def: 0.12, phy: 0.13 },
    Forward: { pac: 0.2, sho: 0.3, pas: 0.13, dri: 0.22, def: 0.03, phy: 0.12 },
  };
  const positionWeights = weights[position];
  return Math.round(
    attributes.pac * positionWeights.pac +
      attributes.sho * positionWeights.sho +
      attributes.pas * positionWeights.pas +
      attributes.dri * positionWeights.dri +
      attributes.def * positionWeights.def +
      attributes.phy * positionWeights.phy,
  );
}

export function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "id-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
