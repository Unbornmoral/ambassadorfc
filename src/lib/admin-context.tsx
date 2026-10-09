import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";

import { getAdminStatus, loginAdmin, logoutAdmin } from "@/lib/admin.functions";

interface AdminContextValue {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const getStatus = useServerFn(getAdminStatus);
  const verifyLogin = useServerFn(loginAdmin);
  const clearLogin = useServerFn(logoutAdmin);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    void getStatus()
      .then((status) => {
        if (active) setIsAdmin(status.isAdmin);
      })
      .catch(() => {
        if (active) setIsAdmin(false);
      });
    return () => {
      active = false;
    };
  }, [getStatus]);

  const login = useCallback(
    async (password: string) => {
      const result = await verifyLogin({ data: { password } });
      setIsAdmin(result.ok);
      return result.ok;
    },
    [verifyLogin],
  );

  const logout = useCallback(async () => {
    await clearLogin();
    setIsAdmin(false);
  }, [clearLogin]);

  const value = useMemo(() => ({ isAdmin, login, logout }), [isAdmin, login, logout]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used inside AdminProvider");
  return context;
}