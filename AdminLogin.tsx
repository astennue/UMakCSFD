import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pre-defined admin credentials
const ADMIN_CREDENTIALS: Record<string, { password: string; user: User }> = {
  '@CSFDSARein03082026': {
    password: 'SuperAdmin@CSFD2026',
    user: {
      id: '1',
      username: '@CSFDSARein03082026',
      role: 'superadmin',
      name: 'Super Admin',
      email: 'superadmin@csfd.umak.edu.ph',
    },
  },
  '@CSFDDIRPoms03082026': {
    password: 'Director@CSFD2026',
    user: {
      id: '2',
      username: '@CSFDDIRPoms03082026',
      role: 'director',
      name: 'Admin Director',
      email: 'director@csfd.umak.edu.ph',
    },
  },
  '@CSFDAS1SAM03082026': {
    password: 'StaffSAM@CSFD2026',
    user: {
      id: '3',
      username: '@CSFDAS1SAM03082026',
      role: 'staff',
      name: 'Admin CSFD Staff SAM',
      email: 'sam@csfd.umak.edu.ph',
    },
  },
  '@CSFDAS2ALMA03082026': {
    password: 'StaffALMA@CSFD2026',
    user: {
      id: '4',
      username: '@CSFDAS2ALMA03082026',
      role: 'staff',
      name: 'Admin CSFD Staff ALMA',
      email: 'alma@csfd.umak.edu.ph',
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('csfd-user');
      if (stored) return JSON.parse(stored);
    }
    return null;
  });

  const isAuthenticated = user !== null;

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    const credential = ADMIN_CREDENTIALS[username];
    if (credential && credential.password === password) {
      setUser(credential.user);
      localStorage.setItem('csfd-user', JSON.stringify(credential.user));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('csfd-user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
