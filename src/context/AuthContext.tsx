import { createContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  organisation_id?: number | null;
  org_type?: string;
  permissions?: string[];
  department_id?: number | null;
  category?: string;
}

interface AuthContextType {
  user: User | null;
  isInitializing: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isInitializing: true,
  login: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  /* =========================
     Restore Session
  ========================= */
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            credentials: "include",
          },
        );

        const data = await res.json();

        if (data.success) {
          console.log("Restored User:", data.data.user);
          setUser(data.data.user);
        }
      } catch (error) {
        console.log("No active session");
      } finally {
        setIsInitializing(false);
      }
    };

    restoreSession();
  }, []);

  /* =========================
     Login
  ========================= */
  const login = (userData: User) => {
    setUser(userData);
  };

  /* =========================
     Logout
  ========================= */
  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      // Clear selected gate/session data
      sessionStorage.removeItem("selectedGate");
      sessionStorage.removeItem("selectedGateId");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitializing,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
