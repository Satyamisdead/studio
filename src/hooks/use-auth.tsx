
"use client";

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, type UserCredential, deleteUser } from 'firebase/auth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from './use-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Define the data shapes here for clarity
export interface SignUpData {
  displayName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential | void>;
  signInWithEmail: (data: SignInData) => Promise<UserCredential | void>;
  signUpWithEmail: (data: SignUpData) => Promise<UserCredential | void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const queryClient = new QueryClient();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const getFirebaseErrorMessage = (error: any) => {
    switch (error.code) {
      case 'auth/invalid-email': return 'Please enter a valid email address.';
      case 'auth/user-not-found':
      case 'auth/wrong-password': return 'Invalid email or password. Please try again.';
      case 'auth/email-already-in-use': return 'An account with this email address already exists.';
      case 'auth/weak-password': return 'The password is too weak. Please use at least 6 characters.';
      case 'auth/requires-recent-login': return 'This operation is sensitive and requires recent authentication. Please sign out and sign back in to delete your account.';
      default: return error.message || "An unexpected error occurred.";
    }
  }
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      router.push('/profile');
      return result;
    } catch (error: any) {
      toast({ title: "Sign-in Error", description: getFirebaseErrorMessage(error), variant: "destructive" });
    }
  };

  const signUpWithEmail = async (data: SignUpData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.displayName });
      router.push('/profile');
      return userCredential;
    } catch (error: any) {
      toast({ title: "Sign-up Error", description: getFirebaseErrorMessage(error), variant: "destructive" });
      throw error;
    }
  }

  const signInWithEmail = async (data: SignInData) => {
    try {
      const result = await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/profile');
      return result;
    } catch (error: any) {
      toast({ title: "Sign-in Error", description: getFirebaseErrorMessage(error), variant: "destructive" });
      throw error;
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/sign-in');
    } catch (error: any) {
      toast({ title: "Sign-out Error", description: getFirebaseErrorMessage(error), variant: "destructive" });
    }
  };

  const deleteAccount = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast({ title: "Error", description: "No user is currently signed in.", variant: "destructive" });
      return;
    }
    try {
      await deleteUser(currentUser);
      toast({ title: "Account Deleted", description: "Your account has been permanently deleted." });
      router.push('/sign-up');
    } catch (error: any) {
      console.error("Delete account error:", error);
      toast({ title: "Deletion Error", description: getFirebaseErrorMessage(error), variant: "destructive" });
    }
  };

  const value = { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, logout, deleteAccount };

  return (
    <AuthContext.Provider value={value}>
        <QueryClientProvider client={queryClient}>
            {loading ? <div className="min-h-screen flex items-center justify-center"><LoadingSpinner text="Authenticating..." /></div> : children}
        </QueryClientProvider>
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
