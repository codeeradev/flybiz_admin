import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { post } from "../api/client";
import { ENDPOINT } from "../api/endpoints";
import {
  clearStoredAuth,
  decodeJwtPayload,
  getDisplayNameFromEmail,
  getStoredAuth,
  setStoredAuth,
  type StoredAuth,
} from "../api/storage";

interface LoginResponse {
  message?: string;
  token?: string;
  admin?: Partial<StoredAuth>;
  user?: Partial<StoredAuth>;
}

export interface AuthUser extends StoredAuth {}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  isAuthenticated: boolean;
  role: string | null;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    return getStoredAuth();
  });

  useEffect(() => {
    if (user) {
      setStoredAuth(user);
    } else {
      clearStoredAuth();
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<AuthUser> => {
    const response = await post<LoginResponse>(ENDPOINT.LOGIN, {
      email,
      password,
    });

    if (!response.token) {
      throw new Error("Login succeeded but no token was returned.");
    }

    const payload = decodeJwtPayload(response.token);
    const roleFromToken = typeof payload?.role === "string" ? payload.role : null;
    const idFromToken = typeof payload?._id === "string" ? payload._id : undefined;

    const authUser: AuthUser = {
      token: response.token,
      email: response.admin?.email ?? response.user?.email ?? email,
      role: roleFromToken ?? response.admin?.role ?? response.user?.role ?? "admin",
      name:
        response.admin?.name ??
        response.user?.name ??
        getDisplayNameFromEmail(email),
      adminId: response.admin?.adminId ?? response.user?.adminId ?? idFromToken,
    };

    setUser(authUser);
    return authUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        role: user?.role ?? null,
        token: user?.token ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
