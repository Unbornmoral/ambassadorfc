import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { verifyAdminPassword } from "@/services/admin";

type AdminContextValue = {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ambassador-admin");
    if (stored === "true") {
      setIsAdmin(true);
    }
  }, []);

  async function login(password: string) {
    const valid = await verifyAdminPassword(password);

    if (valid) {
      setIsAdmin(true);
      localStorage.setItem("ambassador-admin", "true");
    }

    return valid;
  }

  function logout() {
    setIsAdmin(false);
    localStorage.removeItem("ambassador-admin");
  }

  const value = useMemo(
    () => ({ isAdmin, login, logout }),
    [isAdmin],
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used inside AdminProvider");
  }

  return context;
}