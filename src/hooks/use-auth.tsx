
"use client";

import React, { useState, useEffect, useContext, createContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import LoadingSpinner from '@/components/LoadingSpinner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      router.push('/profile');
      return result;
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/sign-in');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  const value = {
    user,
    loading,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="min-h-screen flex items-center justify-center"><LoadingSpinner text="Authenticating..." /></div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const ProtectRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user && !['/sign-in', '/sign-up'].includes(pathname)) {
            router.push('/sign-in');
        }
    }, [user, loading, router, pathname]);

    if (loading || (!user && !['/sign-in', '/sign-up'].includes(pathname))) {
        return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner text="Loading page..." /></div>;
    }

    return <>{children}</>;
};
