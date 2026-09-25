import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type {
  AppData,
  AttendanceStatus,
  Player,
  TeamSettings,
  TrainingSession,
} from "./types";
import { uuid } from "./types";
import { buildSeedData } from "./seed";

const STORAGE_KEY = "ambassador-fc-data-v1";

interface StoreValue {
  data: AppData;
  hydrated: boolean;
  addPlayer: (p: Omit<Player, "id" | "createdAt" | "active">) => void;
  updatePlayer: (id: string, patch: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  addSession: (s: Omit<TrainingSession, "id" | "createdAt">) => void;
  removeSession: (id: string) => void;
  setAttendance: (sessionId: string, playerId: string, status: AttendanceStatus) => void;
  markAllPresent: (sessionId: string) => void;
  clearAttendance: (sessionId: string) => void;
  updateSettings: (patch: Partial<TeamSettings>) => void;
  resetDemoData: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => buildSeedData());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppData>;
        // Merge over the seed so any missing fields still fall back to defaults.
        setData({ ...buildSeedData(), ...parsed });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage full or unavailable */
    }
  }, [data, hydrated]);

  const addPlayer = useCallback<StoreValue["addPlayer"]>((p) => {
    setData((d) => ({
      ...d,
      players: [
        ...d.players,
        { ...p, id: uuid(), active: true, createdAt: new Date().toISOString() },
      ],
    }));
  }, []);

  const updatePlayer = useCallback<StoreValue["updatePlayer"]>((id, patch) => {
    setData((d) => ({
      ...d,
      players: d.players.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }, []);

  const removePlayer = useCallback<StoreValue["removePlayer"]>((id) => {
    setData((d) => ({
      ...d,
      players: d.players.filter((p) => p.id !== id),
      attendance: d.attendance.filter((a) => a.playerId !== id),
    }));
  }, []);

  const addSession = useCallback<StoreValue["addSession"]>((s) => {
    setData((d) => ({
      ...d,
      sessions: [...d.sessions, { ...s, id: uuid(), createdAt: new Date().toISOString() }],
    }));
  }, []);

  const removeSession = useCallback<StoreValue["removeSession"]>((id) => {
    setData((d) => ({
      ...d,
      sessions: d.sessions.filter((s) => s.id !== id),
      attendance: d.attendance.filter((a) => a.sessionId !== id),
    }));
  }, []);

  const setAttendance = useCallback<StoreValue["setAttendance"]>(
    (sessionId, playerId, status) => {
      setData((d) => {
        const existing = d.attendance.find(
          (a) => a.sessionId === sessionId && a.playerId === playerId,
        );
        if (existing) {
          return {
            ...d,
            attendance: d.attendance.map((a) => (a.id === existing.id ? { ...a, status } : a)),
          };
        }
        return {
          ...d,
          attendance: [
            ...d.attendance,
            {
              id: uuid(),
              sessionId,
              playerId,
              status,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      });
    },
    [],
  );

  const markAllPresent = useCallback<StoreValue["markAllPresent"]>((sessionId) => {
    setData((d) => {
      const rest = d.attendance.filter((a) => a.sessionId !== sessionId);
      const existing = d.attendance.filter((a) => a.sessionId === sessionId);
      const next = d.players
        .filter((p) => p.active)
        .map((p) => {
          const prev = existing.find((a) => a.playerId === p.id);
          return {
            id: prev?.id ?? uuid(),
            sessionId,
            playerId: p.id,
            status: "present" as AttendanceStatus,
            notes: prev?.notes,
            createdAt: prev?.createdAt ?? new Date().toISOString(),
          };
        });
      return { ...d, attendance: [...rest, ...next] };
    });
  }, []);

  const clearAttendance = useCallback<StoreValue["clearAttendance"]>((sessionId) => {
    setData((d) => ({
      ...d,
      attendance: d.attendance.filter((a) => a.sessionId !== sessionId),
    }));
  }, []);

  const updateSettings = useCallback<StoreValue["updateSettings"]>((patch) => {
    setData((d) => ({ ...d, settings: { ...d.settings, ...patch } }));
  }, []);

  const resetDemoData = useCallback(() => setData(buildSeedData()), []);

  const value = useMemo<StoreValue>(
    () => ({
      data,
      hydrated,
      addPlayer,
      updatePlayer,
      removePlayer,
      addSession,
      removeSession,
      setAttendance,
      markAllPresent,
      clearAttendance,
      updateSettings,
      resetDemoData,
    }),
    [
      data,
      hydrated,
      addPlayer,
      updatePlayer,
      removePlayer,
      addSession,
      removeSession,
      setAttendance,
      markAllPresent,
      clearAttendance,
      updateSettings,
      resetDemoData,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

/* ---------- derived helpers ---------- */

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function playerAttendanceRate(data: AppData, playerId: string): number {
  const records = data.attendance.filter((a) => a.playerId === playerId);
  if (!records.length) return 0;
  const credit = records.reduce(
    (sum, r) => sum + (r.status === "present" ? 1 : r.status === "late" ? 0.5 : 0),
    0,
  );
  return Math.round((credit / records.length) * 100);
}

export function overallAttendanceRate(data: AppData): number {
  if (!data.attendance.length) return 0;
  const credit = data.attendance.reduce(
    (sum, r) => sum + (r.status === "present" ? 1 : r.status === "late" ? 0.5 : 0),
    0,
  );
  return Math.round((credit / data.attendance.length) * 100);
}

export function sessionSummary(data: AppData, sessionId: string) {
  const records = data.attendance.filter((a) => a.sessionId === sessionId);
  const present = records.filter((r) => r.status === "present").length;
  const late = records.filter((r) => r.status === "late").length;
  const absent = records.filter((r) => r.status === "absent").length;
  const active = data.players.filter((p) => p.active).length;
  return { present, late, absent, marked: records.length, unmarked: Math.max(active - records.length, 0), total: active };
}

export function upcomingSessions(data: AppData) {
  const t = todayISO();
  return [...data.sessions]
    .filter((s) => s.date >= t)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

export function pastSessions(data: AppData) {
  const t = todayISO();
  return [...data.sessions]
    .filter((s) => s.date < t)
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
}
